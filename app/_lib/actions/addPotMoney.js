"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import z from "zod"

// ADD POT MONEY
export async function handleDeposit(prevState, formData) {
  const session = await auth()
  const user_id = session.user.id

  const potID = Number(formData.get("potID"))

  const addMoneySchema = z.object({
    totalSaved: z.number().min(1, "Amount is required"),
  })

  const amountObj = {
    totalSaved: Number(formData.get("totalSaved")),
  }

  const parsedAddAmount = addMoneySchema.safeParse(amountObj)

  if (!parsedAddAmount.success) {
    console.log(parsedAddAmount.error.flatten().fieldErrors)
    return {
      success: false,
      error: parsedAddAmount.error.flatten().fieldErrors,
    }
  }

  const amount = parsedAddAmount.data
  console.log(amount)

  const { data: totalSavedAmount, error } = await supabase
    .from("pots")
    .select("totalSaved")
    .eq("id", potID)
    .eq("user_id", user_id)
    .single()

  if (error) throw new Error(error.message)

  const addedAmount = totalSavedAmount.totalSaved + amount.totalSaved

  const { updateError } = await supabase
    .from("pots")
    .update({ totalSaved: addedAmount })
    .eq("id", potID)
    .eq("user_id", user_id)

  if (updateError) throw new Error(updateError.message)

  revalidatePath("/pots")
  return { success: true, error: false }
}
