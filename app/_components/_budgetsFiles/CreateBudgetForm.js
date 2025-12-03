"use client"

import { createBudget } from "@/app/_lib/actions/createBudget"
import { useActionState, useEffect } from "react"
import Button from "../Button"
import { useModal } from "../ClickContext"
import { ZodErrors } from "../ZodErrors"
import { useFormStatus } from "react-dom"
import toast from "react-hot-toast"
import { editBudget } from "@/app/_lib/actions/editBudget"

const initialState = { success: false, error: null }

function CreateBudgetForm({ onCloseModal, currentBudget, budgets }) {
  const [state, formAction, isPending] = useActionState(
    currentBudget?.id ? editBudget : createBudget,
    initialState
  )
  const { allCategories, themeColors } = useModal()

  useEffect(
    function () {
      if (state?.success) {
        toast.success(
          `Budget ${currentBudget?.id ? "Updated" : "Created"} Successfully 🎉`
        )
        onCloseModal?.()
      }
      if (state?.error) {
        toast.error(
          `Budget couldn't be ${currentBudget?.id ? "Edited" : "Created"}`
        )
      }
    },
    [state, onCloseModal, currentBudget?.id]
  )

  return (
    <form action={formAction}>
      <p className="text-sm text-gray-500">
        Choose a category to set a spending budget. These categories can help
        you monitor spending.
      </p>

      {/* Hidden field */}

      <input
        type="hidden"
        value={currentBudget?.id}
        name="budgetId"
        id="budgetId"
      />

      <div className="py-5">
        <label
          htmlFor="categories"
          className="text-sm font-semibold text-gray-900"
        >
          Budget Category
        </label>

        <select
          name="category"
          id="category"
          disabled={isPending}
          className="mt-1 h-10 w-full cursor-pointer rounded-md border border-stone-500 px-4 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          required
          defaultValue={currentBudget.id ? currentBudget.category : ""}
        >
          <option value="" disabled>
            Select a Category
          </option>

          {allCategories?.map((category) => (
            <option
              key={category.id}
              value={category.category}
              disabled={budgets?.some(
                (budget) =>
                  budget.category === category.category &&
                  budget.id !== currentBudget.id
              )}
            >
              {category.category}{" "}
              {budgets?.some(
                (budget) =>
                  budget.category === category.category &&
                  budget.id !== currentBudget.id
              ) && "(Already used ⛔)"}
            </option>
          ))}
        </select>
        <ZodErrors error={state?.error?.category} />
      </div>

      <div>
        <label
          htmlFor="maxSpend"
          className="text-sm font-semibold text-gray-900"
        >
          Maximum Spend ($)
        </label>
        <input
          type="number"
          id="maxSpend"
          name="maxSpend"
          disabled={isPending}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="$50.00"
          defaultValue={currentBudget.id ? currentBudget.maxSpend : ""}
        />
        <ZodErrors error={state?.error?.maxSpend} />
      </div>

      <div className="py-5">
        <label
          htmlFor="themeColor"
          disabled={isPending}
          className="text-sm font-semibold text-gray-900"
        >
          Theme Color
        </label>

        <select
          name="themeColor"
          id="themeColor"
          disabled={isPending}
          className="mt-1 h-10 w-full cursor-pointer rounded-md border border-stone-500 px-4 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          required
          defaultValue={currentBudget.id ? currentBudget.themeColor : ""}
        >
          <option value="" disabled>
            Select a theme
          </option>

          {themeColors?.map((theme) => (
            <option
              key={theme.id}
              value={theme.value}
              style={{ color: theme.value, fontWeight: 600 }}
            >
              {theme.name}
            </option>
          ))}
        </select>
        <ZodErrors error={state?.error?.themeColor} />
      </div>

      <BudgetButton currentBudget={currentBudget} />
    </form>
  )
}

export function BudgetButton({ currentBudget }) {
  const state = useFormStatus()

  return (
    <Button
      disabled={state.pending}
      customStyles={`mt-2 w-full text-white  py-3 rounded-md font-bold ${state.pending ? "bg-gray-600 cursor-no-drop" : "cursor-pointer bg-gray-900"}`}
    >
      {currentBudget?.id
        ? state.pending
          ? "Editing Budget..."
          : "Edit Budget"
        : state.pending
          ? "Saving Changes..."
          : "Save Changes"}
    </Button>
  )
}

export default CreateBudgetForm
