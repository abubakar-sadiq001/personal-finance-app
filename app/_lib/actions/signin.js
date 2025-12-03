"use server"

import { signIn } from "@/app/api/auth/[...nextauth]/route"
import { AuthError } from "next-auth"

// SIGNIN USER
export async function handleSignIn(prevState, formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email").toString(),
      password: formData.get("password").toString(),
      redirect: false,
    })

    // If no error thrown, redirect on client side
    return { status: "success", message: "Logged in successfully!" }
  } catch (error) {
    console.log("SignIn error:", error)

    if (error instanceof AuthError) {
      switch (error.type) {
        case "credentials":
          return { status: "error", message: "Invalid email or password." }
        case "CallbackRouteError":
          return { status: "error", message: "Invalid email or password." }
        default:
          return {
            status: "error",
            message: "Something went wrong. Please try again.",
          }
      }
    }

    // Handle any other errors
    return {
      status: "error",
      message: "Invalid credentials. Please try again.",
    }
  }
}
