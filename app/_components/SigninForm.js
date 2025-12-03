"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import toast from "react-hot-toast"
import Button from "../_components/Button"
import { handleSignIn } from "../_lib/actions/signin"
import { useSession } from "next-auth/react"

function SigninForm() {
  const [state, formAction, isPending] = useActionState(handleSignIn, null)
  const router = useRouter()
  const { status } = useSession()
  const [showPassword, setShowPassword] = useState(false)

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  }

  const isLoading = status === "loading" || isPending

  useEffect(() => {
    if (!state) return

    if (state.status === "success") {
      toast.success(`Logged In as user 🎉`)
      router.replace("/")
    } else if (state.status === "error") {
      toast.error(state.message)
    }
  }, [state, router])

  return (
    <form
      action={formAction}
      className="relative my-[50px] max-h-[100%] w-full max-w-[500px] overflow-y-auto rounded-[6px] bg-white p-6 shadow-xl"
    >
      <h1 className="text-4xl font-bold text-gray-900">
        {state?.pending ? "Login in..." : "Login"}
      </h1>

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

      <LoginButton />

      <p className="mt-4 text-center text-[13px] text-gray-500">
        Need to create an account?
        <Link href="/signup" className="ml-1 font-bold text-gray-900 underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}

export function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      customStyles={`mt-8 w-full text-white  py-3 rounded-md font-bold cursor-pointer bg-gray-900 ${pending ? "cursor-progress" : "pointer"}`}
    >
      {pending ? "Login in..." : "Login"}
    </Button>
  )
}

export default SigninForm
