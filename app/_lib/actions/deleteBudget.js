// "use server"

// import { auth } from "@/app/api/auth/[...nextauth]/route"
// // import { supabase } from "../supabase"
// import { revalidatePath } from "next/cache"
// import { createServerClient } from "../supabaseServer"

// function db() {
//   return createServerClient()
// }

// // DELETE BUDGET
// export async function deleteBudget(budgetId) {
//   const session = await auth()
//   const user_id = session?.user?.id
//   const supabase = db()

//   const { error } = await supabase
//     .from("budgets")
//     .delete()
//     .eq("id", budgetId)
//     .eq("user_id", user_id)

//   if (error) throw new Error(error.message)

//   revalidatePath("/budgets")
// }

"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { revalidatePath } from "next/cache"
import { createServerClient } from "../supabaseServer"

function db() {
  return createServerClient()
}

export async function deleteBudget(budgetId) {
  try {
    const session = await auth()
    const user_id = session?.user?.id
    if (!user_id) return { success: false, message: "Not authenticated" }

    const supabase = db()

    const { data, error } = await supabase
      .from("budgets")
      .delete()
      .eq("id", budgetId)
      .eq("user_id", user_id)
      .select()

    if (error) {
      console.error("Supabase delete error:", error)
      return { success: false, message: error.message, details: error }
    }

    revalidatePath("/budgets")
    return { success: true, data }
  } catch (err) {
    console.error("deleteBudget unexpected:", err)
    return { success: false, message: err?.message || String(err) }
  }
}
