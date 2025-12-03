"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import z from "zod"
import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"

// EDIT POT
export async function handleEditPot(prevState, potData) {
  const session = await auth()
  const user_id = session.user.id

  const editingID = Number(potData.get("editPotId"))

  const editingSchema = z.object({
    potName: z
      .string()
      .min(3, "Minimum of 3 letters is required")
      .max(30, "Maximum is 30 letters"),
    target: z.number().min(1, "This field is required"),
    theme: z.string().min(1, "This field is required"),
  })

  const newEditData = {
    potName: potData.get("potName"),
    target: Number(potData.get("target")),
    theme: potData.get("theme"),
  }

  const parsedEditedData = editingSchema.safeParse(newEditData)

  if (!parsedEditedData.success) {
    return {
      success: false,
      error: parsedEditedData.error.flatten().fieldErrors,
    }
  }

  const editedResult = parsedEditedData.data

  const { error: editingError } = await supabase
    .from("pots")
    .update(editedResult)
    .eq("id", editingID)
    .eq("user_id", user_id)

  if (editingError) throw new Error(editingError.message)

  revalidatePath("/pots")
  return { success: true, error: false }
}
