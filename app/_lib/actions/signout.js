"use server"

import { signOut } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

// SIGNOUT USER
export async function handleSignout() {
  await signOut({ redirect: false })

  redirect("/signin")
}
