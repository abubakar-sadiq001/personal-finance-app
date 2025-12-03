"use server"

import z from "zod"
import { getUsersEmail } from "../data-services"
import { supabase } from "../supabase"
import { bcrypt } from "bcrypt"

// SIGNUP USER
export async function handleSignUp(prevState, formData) {
  const emails = await getUsersEmail()

  const signupSchema = z.object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    password: string().min(8, "Password must be atleast 8 characters").trim(),
  })

  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  const credentials = {
    name,
    email,
    password,
  }

  const parsed = signupSchema.safeParse(credentials)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    }
  }

  const result = parsed.data

  const hashed = await bcrypt.hash(result.password, 10)

  // Check duplicate check
  const duplicateEmail = emails.some((email) => email.email === result.email)

  if (duplicateEmail) {
    return {
      success: false,
      error: "Email already exist, Login",
      duplicate: true,
    }
  }
  console.log(duplicateEmail)

  const { error } = await supabase.from("users").insert({
    name: result.name,
    email: result.email,
    password_hash: hashed,
  })

  if (error) throw new Error(error.message)

  return { success: true, error: false }
}
