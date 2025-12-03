"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"

// DELETE BUDGET
export async function deleteBudget(budgetId) {
  const session = await auth()
  const user_id = session?.user?.id

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", budgetId)
    .eq("user_id", user_id)

  if (error) throw new Error(error.message)

  revalidatePath("/budgets")
}
