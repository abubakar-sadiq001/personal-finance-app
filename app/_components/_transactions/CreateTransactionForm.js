"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import toast from "react-hot-toast"
import { createTransaction } from "../../_lib/actions"
import Button from "../Button"
import { ZodErrors } from "../ZodErrors"

const initialState = { success: false, error: null }
const maxLength = 30

function CreateTransactionForm({ allCategories, onCloseModal }) {
  const [state, formAction, isPending] = useActionState(
    createTransaction,
    initialState
  )

  const [letters, setLetters] = useState("")

  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    if (state?.success) {
      toast.success("Transaction created successfully 🎉")
      onCloseModal?.()
    }
    if (state?.error) {
      toast.error("Transaction couldn't be created")
    }
  }, [state, onCloseModal])

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-gray-900">
          Transaction name
        </label>
        <input
          type="text"
          id="name"
          name="recipientName"
          disabled={isPending}
          autoFocus
          maxLength={maxLength}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="e.g James thompson"
          onChange={(e) => setLetters(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <ZodErrors error={state?.error?.recipientName} />
          <p className={`text-sm ${!state?.error?.recipientName && "mt-2.5"}`}>
            {maxLength - letters.length} letters remaining
          </p>
        </div>
      </div>

      <div className="py-5">
        <label
          htmlFor="categories"
          className="text-sm font-semibold text-gray-900"
        >
          Category
        </label>

        <select
          name="categories"
          id="categories"
          disabled={isPending}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          required
        >
          {allCategories?.map((category) => (
            <option key={category.id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        <ZodErrors error={state?.error?.category} />
      </div>

      <div>
        <label htmlFor="amount" className="text-sm font-semibold text-gray-900">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          disabled={isPending}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="$50.00"
        />
        <ZodErrors error={state?.error?.amount} />
      </div>

      <div className="my-3">
        <label htmlFor="avatar" className="text-sm font-semibold text-gray-900">
          Upload Avatar
        </label>
        <input
          type="file"
          accept="image/*"
          id="avatar"
          name="avatar"
          disabled={isPending}
          className="mt-1 h-20 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
        />
        <ZodErrors error={state?.error?.avatar} />
      </div>

      <div className="mt-3 flex items-center">
        <input
          type="checkbox"
          name="isRecurring"
          id="recurring"
          disabled={isPending}
          className="mr-3 h-4 w-4 appearance-none rounded-sm border-2 border-gray-500 bg-white checked:border-transparent checked:bg-gray-900"
          value={isChecked}
          onChange={() => setIsChecked((check) => !check)}
        />
        <label htmlFor="recurring" className="font-semibold text-gray-900">
          Is Recurring ?
        </label>
      </div>

      <RenderSubmitBtn />
    </form>
  )
}

export default CreateTransactionForm

function RenderSubmitBtn() {
  const state = useFormStatus()

  return (
    <Button
      disabled={state.pending}
      customStyles={`w-full text-white py-3 rounded-md font-bold ${state.pending ? "bg-gray-500" : "bg-gray-900 "} mt-6 ${state.pending ? "cursor-no-drop" : "cursor-pointer"}`}
    >
      {state.pending ? "Submitting..." : "Submit"}
    </Button>
  )
}
