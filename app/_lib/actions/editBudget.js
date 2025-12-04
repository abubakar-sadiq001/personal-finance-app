"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import z from "zod"
// import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { createServerClient } from "../supabaseServer"

function db() {
  return createServerClient()
}

// EDIT BUDGET
export async function editBudget(prevState, newFormData) {
  const session = await auth()
  const user_id = session?.user?.id
  const supabase = db()

  const currentBudgetID = Number(newFormData.get("budgetId"))

  const budgetSchema = z.object({
    category: z.string().min(1, "Category is required"),
    themeColor: z.string().min(1, "Theme is required"),
    maxSpend: z
      .number()
      .min(1, "Amount is required")
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), "Amount must be a number"),
  })

  // BUDGET DATA
  const updatedBudgetData = {
    category: newFormData.get("category"),
    themeColor: newFormData.get("themeColor"),
    maxSpend: Number(newFormData.get("maxSpend")),
  }

  const updatedParsedBudgetData = budgetSchema.safeParse(updatedBudgetData)

  if (!updatedParsedBudgetData.success) {
    console.log(updatedParsedBudgetData.error.flatten().fieldErrors)
    return {
      success: false,
      error: updatedParsedBudgetData.error.flatten().fieldErrors,
    }
  }

  const newValidatedBudgetData = updatedParsedBudgetData.data

  const { error } = await supabase
    .from("budgets")
    .update(newValidatedBudgetData)
    .eq("id", currentBudgetID)
    .eq("user_id", user_id)

  if (error) throw new Error(error.message)

  revalidatePath("/budgets")
  return { success: true, error: null }
}
