// import { MAX_DATA_PER_PAGE } from "../_utils/pageSize"
// import { auth } from "../api/auth/[...nextauth]/route"
// import { supabase } from "./supabase"
// import { createServerClient } from "./supabaseServer"

// export async function getTransactions({ sortBy, page, category = "all" } = {}) {
//   const session = await auth()
//   const user_id = session?.user?.id

//   let query = supabase
//     .from("transactions")
//     .select("*", { count: "exact" })
//     .eq("user_id", user_id)

//   // FILTER
//   if (category && category !== "all") {
//     const categoryFilters = {
//       general: "General",
//       bills: "Bills",
//       dinningout: "Dinning Out",
//       transportation: "Transportation",
//       personalcare: "Personal Care",
//       lifestyle: "Lifestyle",
//       shopping: "Shopping",
//     }
//     query = query.eq("category", categoryFilters[category])
//   }

//   // SORT
//   if (sortBy)
//     query = query.order(sortBy?.field, {
//       ascending: sortBy?.direction === "asc",
//     })

//   // PAGINATION
//   // Get total count first (to validate page)
//   const { count, error: countError } = await query
//   if (countError) throw new Error("Failed to count transactions")

//   if (page) {
//     const pageCount = Math.ceil(count / MAX_DATA_PER_PAGE)
//     const safePage = Math.min(page, pageCount || 1)

//     const from = (safePage - 1) * MAX_DATA_PER_PAGE
//     const to = from + MAX_DATA_PER_PAGE - 1
//     query = query.range(from, to)
//   }

//   const { data, error } = await query
//   if (error) throw new Error("Transactions couldn't be loaded! ")

//   // console.log(data)
//   return { data, count }
// }

// // GET TRANSACTIONS EXPLICITLY
// export async function getTransactionsExplicitly() {
//   const session = await auth()
//   const user_id = session?.user?.id

//   const { data, error } = await supabase
//     .from("transactions")
//     .select("")
//     .eq("user_id", user_id)

//   if (error) throw new Error("Transactions couldn't be loaded! ")

//   return data
// }

// export async function getAllCategories() {
//   const { data, error } = await supabase.from("allCategories").select("*")

//   if (error) throw new Error("Categories couldn't be loaded!")

//   return data
// }

// export async function getThemeColors() {
//   const { data: themes, error } = await supabase.from("themeColors").select("*")

//   if (error) throw new Error(error.message)

//   return themes
// }

// export async function getBudgets() {
//   const session = await auth()
//   const user_id = session?.user?.id

//   const { data: budgets, error } = await supabase
//     .from("budgets")
//     .select("*")
//     .order("created_at", { ascending: true })
//     .eq("user_id", user_id)

//   // await new Promise((res) => setTimeout(res, 5000))

//   if (error) throw new Error(error.message)

//   return budgets
// }

// export async function getPots() {
//   const session = await auth()
//   const user_id = session?.user?.id

//   const { data, error } = await supabase
//     .from("pots")
//     .select("*")
//     .order("created_at", { ascending: true })
//     .eq("user_id", user_id)

//   if (error) throw new Error(error.message)

//   return data
// }

// export async function findUser(email) {
//   // 1. Find user in database
//   const supabaseServer = createServerClient()
//   const { data: user, error } = await supabaseServer
//     .from("users")
//     .select("*")
//     .eq("email", email)
//     .single()

//   if (error || !user) {
//     return null
//   }

//   // console.log(user)
//   return user
// }

// export async function getUsersEmail() {
//   const { data: usersEmail, error } = await supabase
//     .from("users")
//     .select("email")

//   if (error) throw new Error(error.message)

//   return usersEmail
// }

"use server"
// VERY IMPORTANT: forces this file to be server-only
// so it will not run during build as an RSC

import { MAX_DATA_PER_PAGE } from "../_utils/pageSize"
import { auth } from "../api/auth/[...nextauth]/route"
import { createServerClient } from "./supabaseServer"

// ------------------------------------------
// SERVER SUPABASE CLIENT
// ------------------------------------------
function db() {
  return createServerClient()
}

// ------------------------------------------
// GET TRANSACTIONS
// ------------------------------------------
export async function getTransactions({ sortBy, page, category = "all" } = {}) {
  const session = await auth()
  const user_id = session?.user?.id

  const supabase = db()

  let query = supabase
    .from("transactions")
    .select("*", { count: "exact" })
    .eq("user_id", user_id)

  // FILTER
  if (category && category !== "all") {
    const categoryFilters = {
      general: "General",
      bills: "Bills",
      dinningout: "Dinning Out",
      transportation: "Transportation",
      personalcare: "Personal Care",
      lifestyle: "Lifestyle",
      shopping: "Shopping",
    }
    query = query.eq("category", categoryFilters[category])
  }

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    })

  // Count first
  const { count, error: countError } = await query
  if (countError) throw new Error("Failed to count transactions")

  // PAGINATION
  if (page) {
    const pageCount = Math.ceil(count / MAX_DATA_PER_PAGE)
    const safePage = Math.min(page, pageCount || 1)

    const from = (safePage - 1) * MAX_DATA_PER_PAGE
    const to = from + MAX_DATA_PER_PAGE - 1
    query = query.range(from, to)
  }

  const { data, error } = await query
  if (error) throw new Error("Transactions couldn't be loaded!")

  return { data, count }
}

// ------------------------------------------
// GET ALL TRANSACTIONS (explicit)
// ------------------------------------------
export async function getTransactionsExplicitly() {
  const session = await auth()
  const user_id = session?.user?.id

  const supabase = db()

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user_id)

  if (error) throw new Error("Transactions couldn't be loaded!")

  return data
}

// ------------------------------------------
// GET CATEGORIES
// ------------------------------------------
export async function getAllCategories() {
  const supabase = db()

  const { data, error } = await supabase.from("allCategories").select("*")

  if (error) throw new Error("Categories couldn't be loaded!")

  return data
}

// ------------------------------------------
// GET THEME COLORS
// ------------------------------------------
export async function getThemeColors() {
  const supabase = db()

  const { data: themes, error } = await supabase.from("themeColors").select("*")

  if (error) throw new Error(error.message)

  return themes
}

// ------------------------------------------
// GET BUDGETS
// ------------------------------------------
export async function getBudgets() {
  const session = await auth()
  const user_id = session?.user?.id

  const supabase = db()

  const { data: budgets, error } = await supabase
    .from("budgets")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id)

  if (error) throw new Error(error.message)

  return budgets
}

// ------------------------------------------
// GET POTS
// ------------------------------------------
export async function getPots() {
  const session = await auth()
  const user_id = session?.user?.id

  const supabase = db()

  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id)

  if (error) throw new Error(error.message)

  return data
}

// ------------------------------------------
// FIND USER (used in NextAuth)
// ------------------------------------------
export async function findUser(email) {
  const supabase = db()

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single()

  if (error || !user) return null

  return user
}

// ------------------------------------------
// GET LIST OF USERS' EMAILS
// ------------------------------------------
export async function getUsersEmail() {
  const supabase = db()

  const { data: usersEmail, error } = await supabase
    .from("users")
    .select("email")

  if (error) throw new Error(error.message)

  return usersEmail
}
