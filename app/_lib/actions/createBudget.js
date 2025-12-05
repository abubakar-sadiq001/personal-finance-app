// "use server"

// import { auth } from "@/app/api/auth/[...nextauth]/route"
// import z from "zod"
// // import { supabase } from "../supabase"
// import { revalidatePath } from "next/cache"
// import { createServerClient } from "../supabaseServer"

// function db() {
//   return createServerClient()
// }

// // CREATE BUDGET
// export async function createBudget(prevState, formData) {
//   const session = await auth()
//   const user_id = session?.user?.id
//   const supabase = db()

//   const budgetSchema = z.object({
//     category: z.string().min(1, "Category is required"),
//     themeColor: z.string().min(1, "Theme is required"),
//     maxSpend: z
//       .number()
//       .min(1, "Amount is required")
//       .transform((val) => Number(val))
//       .refine((val) => !isNaN(val), "Amount must be a number"),
//   })

//   // BUDGET DATA
//   const newBudgetData = {
//     category: formData.get("category"),
//     themeColor: formData.get("themeColor"),
//     maxSpend: Number(formData.get("maxSpend")),
//   }

//   const parsedBudgetData = budgetSchema.safeParse(newBudgetData)

//   if (!parsedBudgetData.success) {
//     console.log(parsedBudgetData.error.flatten().fieldErrors)
//     return {
//       success: false,
//       error: parsedBudgetData.error.flatten().fieldErrors,
//     }
//   }

//   const validatedBudgetData = parsedBudgetData.data

//   const { error } = await supabase
//     .from("budgets")
//     .insert([{ ...validatedBudgetData, user_id: user_id }])

//   if (error) throw new Error(error.message)

//   revalidatePath("/budgets")
//   return { success: true, error: null }
// }

"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import z from "zod"
import { revalidatePath } from "next/cache"
import { createServerClient } from "../supabaseServer"

function db() {
  return createServerClient()
}

export async function createBudget(prevState, formData) {
  try {
    const session = await auth()
    const user_id = session?.user?.id
    if (!user_id) {
      return {
        success: false,
        message: "Not authenticated",
        code: "unauthenticated",
      }
    }

    const supabase = db()

    const newBudgetData = {
      category: formData.get("category"),
      themeColor: formData.get("themeColor"),
      maxSpend: Number(formData.get("maxSpend")),
    }

    const schema = z.object({
      category: z.string().min(1),
      themeColor: z.string().min(1),
      maxSpend: z.number().min(0.01),
    })

    const parsed = schema.safeParse(newBudgetData)
    if (!parsed.success) {
      return {
        success: false,
        message: "validation",
        details: parsed.error.flatten().fieldErrors,
      }
    }

    const { data, error } = await supabase
      .from("budgets")
      .insert([{ ...parsed.data, user_id }])
      .select() // request returned row so we can inspect
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return { success: false, message: error.message, details: error }
    }

    revalidatePath("/budgets")
    return { success: true, data }
  } catch (err) {
    console.error("createBudget unexpected error:", err)
    return { success: false, message: err?.message || String(err) }
  }
}
