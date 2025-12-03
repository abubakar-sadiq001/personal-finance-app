"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import z from "zod"
import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"

// CREATE BUDGET
export async function createBudget(prevState, formData) {
  const session = await auth()
  const user_id = session?.user?.id

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
  const newBudgetData = {
    category: formData.get("category"),
    themeColor: formData.get("themeColor"),
    maxSpend: Number(formData.get("maxSpend")),
  }

  const parsedBudgetData = budgetSchema.safeParse(newBudgetData)

  if (!parsedBudgetData.success) {
    console.log(parsedBudgetData.error.flatten().fieldErrors)
    return {
      success: false,
      error: parsedBudgetData.error.flatten().fieldErrors,
    }
  }

  const validatedBudgetData = parsedBudgetData.data

  const { error } = await supabase
    .from("budgets")
    .insert([{ ...validatedBudgetData, user_id: user_id }])

  if (error) throw new Error(error.message)

  revalidatePath("/budgets")
  return { success: true, error: null }
}
