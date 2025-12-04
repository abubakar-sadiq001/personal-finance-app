"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import z from "zod"
// import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { createServerClient } from "../supabaseServer"

function db() {
  return createServerClient()
}

// CREATE POT
export async function hanldeCreatePot(prevState, potData) {
  const session = await auth()
  const user_id = session.user.id
  const supabase = db()

  const newPotSchema = z.object({
    potName: z
      .string()
      .min(3, "Minimum of 3 letters is required")
      .max(30, "Maximum is 30 letters"),
    target: z.number().min(1, "This field is required"),
    theme: z.string().min(1, "This field is required"),
  })

  const newPotData = {
    potName: potData.get("potName"),
    target: Number(potData.get("target")),
    theme: potData.get("theme"),
  }

  const parsedPotData = newPotSchema.safeParse(newPotData)

  if (!parsedPotData.success) {
    console.log(parsedPotData.error.flatten().fieldErrors)
    return {
      success: false,
      error: parsedPotData.error.flatten().fieldErrors,
    }
  }

  const potDataResult = parsedPotData.data

  const { error } = await supabase
    .from("pots")
    .insert([{ ...potDataResult, user_id: user_id }])

  if (error) throw new Error(error.message)

  console.log(potDataResult)

  revalidatePath("/pots")
  return { success: true, error: false }
}
