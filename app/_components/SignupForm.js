"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import Button from "../_components/Button"
import { handleSignUp } from "../_lib/actions/signup"
import { ZodErrors } from "./ZodErrors"
import { useFormStatus } from "react-dom"

const initialState = { success: false, error: null }

function SignupForm() {
  const [state, signUpAction, isPending] = useActionState(
    handleSignUp,
    initialState
  )
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  }

  const isLoading = isPending

  useEffect(
    function () {
      if (state?.success === true) {
        router.replace("/signin")
      }
    },
    [state, router]
  )

  return (
    <form
      action={signUpAction}
      className="relative my-[50px] max-h-[100%] w-full max-w-[500px] overflow-y-auto rounded-[6px] bg-white p-6 shadow-xl"
    >
      <h1 className="text-4xl font-bold text-gray-900">Sign up</h1>

      <div className="mt-3">
        <label
          htmlFor="name"
          className="text-[13px] font-semibold text-gray-600"
        >
          Name{" "}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          disabled={isLoading}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="John Doe"
        />
        <ZodErrors error={state?.error?.name} />
      </div>

      <div className="my-5">
        <label
          htmlFor="email"
          className="text-[13px] font-semibold text-gray-600"
        >
          Email{" "}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          disabled={isLoading}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="Email"
        />
        <ZodErrors error={state?.error?.email} />
      </div>

      <div className="mt-3">
        <label
          htmlFor="password"
          className="text-[13px] font-semibold text-gray-600"
        >
          Password{" "}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          disabled={isLoading}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="Password"
        />
        {/* <p>Password must be at least 8 characters</p> */}
        <ZodErrors error={state?.error?.password} />
        <p className="mt-3 text-[12px] italic text-pink-500">
          {state.duplicate && "Email already exist, Login"}
        </p>
      </div>

      <div className="mt-3 flex items-center">
        <input
          type="checkbox"
          id="checkbox"
          disabled={isPending}
          className="h-4 w-4 appearance-none rounded-sm border-2 border-gray-500 bg-white checked:border-transparent checked:bg-gray-900"
          onChange={togglePasswordVisibility}
        />
        <label htmlFor="checkbox" className="ml-2 text-[14px] text-gray-500">
          Show Password
        </label>
      </div>

      <SignupButton />

      <p className="mt-4 text-center text-[13px] text-gray-500">
        Already have an account?
        <Link href="/signin" className="ml-1 font-bold text-gray-900 underline">
          Login
        </Link>
      </p>
    </form>
  )
}

export function SignupButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      customStyles={`mt-8 w-full text-white  py-3 rounded-md font-bold cursor-pointer bg-gray-900 ${pending ? "cursor-progress" : "pointer"}`}
    >
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  )
}

export default SignupForm
