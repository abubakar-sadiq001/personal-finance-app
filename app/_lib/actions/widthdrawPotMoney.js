"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import z from "zod"
// import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { createServerClient } from "../supabaseServer"

function db() {
  return createServerClient()
}

// WITHDRAW POT MONEY
export async function handleWithdraw(prevState, formData) {
  const session = await auth()
  const user_id = session.user.id
  const supabase = db()

  const potID = Number(formData.get("potID"))

  const withdrawSchema = z.object({
    totalSaved: z.number().min(1, "Amount is required"),
  })

  const amountObj = {
    totalSaved: Number(formData.get("totalSaved")),
  }

  const parsedWithdrawAmount = withdrawSchema.safeParse(amountObj)

  if (!parsedWithdrawAmount.success) {
    console.log(parsedWithdrawAmount.error.flatten().fieldErrors)
    return {
      success: false,
      error: parsedWithdrawAmount.error.flatten().fieldErrors,
    }
  }

  const { data: totalSavedAmount, error } = await supabase
    .from("pots")
    .select("totalSaved")
    .eq("id", potID)
    .eq("user_id", user_id)
    .single()

  if (error) throw new Error(error.message)

  const parsedAmount = parsedWithdrawAmount.data

  const withdrawnAmount = totalSavedAmount.totalSaved - parsedAmount.totalSaved

  const { updateError } = await supabase
    .from("pots")
    .update({ totalSaved: withdrawnAmount })
    .eq("id", potID)
    .eq("user_id", user_id)

  if (error) throw new Error(updateError.message)

  revalidatePath("/pots")
  return { success: true, error: null }
}
