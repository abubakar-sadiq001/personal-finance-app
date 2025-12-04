"use server"

import { z } from "zod"

import { revalidatePath } from "next/cache"
import { auth } from "../api/auth/[...nextauth]/route"
import { createServerClient } from "./supabaseServer"
// import { supabase } from "./supabase"

function db() {
  return createServerClient()
}

export async function createTransaction(prevState, formData) {
  const session = await auth()
  const user_id = session?.user?.id
  const supabase = db()

  const isRecurring = formData.get("isRecurring") === "true" ? true : false

  const newTransactionSchema = z.object({
    recipientName: z
      .string()
      .min(3, "Name should be at least 3 letters")
      .max(30, "Name cannot exceed 30 letters"),
    category: z.string().min(1, "Category is required"),
    amount: z
      .number()
      .min(1, "Amount is required")
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), "Amount must be a number"),
    isRecurring: z.boolean(),
    avatar: z
      .any()
      .refine((file) => !file || (file instanceof File && file.size > 0), {
        message: "Invalid file format",
      }),
  })

  const newTransactionData = {
    recipientName: formData.get("recipientName"),
    category: formData.get("categories"),
    amount: Number(formData.get("amount")),
    isRecurring: isRecurring,
    avatar: formData.get("avatar") || null,
  }

  const parsedData = newTransactionSchema.safeParse(newTransactionData)

  if (!parsedData.success) {
    console.log({ error: parsedData.error.flatten().fieldErrors })
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
    }
  }

  const validatedData = parsedData.data
  // console.log(validatedData)

  // Image name
  const imageName = `${Math.random()}-${validatedData.avatar.name}`.replaceAll(
    "/",
    ""
  )
  // // Upload avatar
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, validatedData.avatar, {
      upsert: false,
    })

  if (storageError) {
    console.error(storageError.message)
    throw new Error(storageError.message)
    // throw new Error("Avatar couldn't be uploaded")
  }

  // 2️⃣ Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(imageName)

  const avatarUrl = publicUrlData.publicUrl

  const { error } = await supabase
    .from("transactions")
    .insert([{ ...validatedData, avatar: avatarUrl, user_id: user_id }])

  if (error) throw new Error("Transaction couldn't be created")

  revalidatePath("/transactions")
  return { success: true, error: null }
}
