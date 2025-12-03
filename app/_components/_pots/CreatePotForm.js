"use client"

import Button from "../Button"

import { useActionState, useEffect, useState } from "react"

import { hanldeCreatePot } from "@/app/_lib/actions/createPot"
import { handleEditPot } from "@/app/_lib/actions/editPot"
import { MAX_NAME_LENGTH } from "@/app/_utils/helpers"
import { useFormStatus } from "react-dom"
import toast from "react-hot-toast"
import { useModal } from "../ClickContext"
import { ZodErrors } from "../ZodErrors"

const initialState = { success: false, error: null }

function CreatePotForm() {
  const { themeColors, handleClose, editPotById = {} } = useModal()
  const editablePotFields = editPotById
  const isEditMode = editPotById?.id

  const [state, formAction, isPending] = useActionState(
    isEditMode ? handleEditPot : hanldeCreatePot,
    initialState
  )

  const [letters, setLetters] = useState("")

  useEffect(() => {
    if (state?.success) {
      toast.success(`Pot ${isEditMode ? "Edited" : "Created"} Successfully 🎉`)
      handleClose?.()
    }
    if (state?.error) toast.error("Oops ‼️")
  }, [state, handleClose, isEditMode])

  return (
    <form action={formAction}>
      <div>
        <p className="my-3 text-sm text-gray-500">
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </p>

        <input type="hidden" name="editPotId" value={isEditMode} />

        <label htmlFor="name" className="text-sm font-semibold text-gray-900">
          Pot Name
        </label>
        <input
          type="text"
          id="potName"
          name="potName"
          disabled={isPending}
          autoFocus
          maxLength={MAX_NAME_LENGTH}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="e.g James thompson"
          onChange={(e) => setLetters(e.target.value)}
          defaultValue={isEditMode ? editablePotFields.potName : ""}
        />
        <div className="flex items-center justify-between">
          <ZodErrors error={state?.error?.potName} />
          <p
            className={`text-sm text-gray-500 ${!state?.error?.potName && "mt-2.5"}`}
          >
            {MAX_NAME_LENGTH - letters.length} letters remaining
          </p>
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="target" className="text-sm font-semibold text-gray-900">
          Target Amount ($)
        </label>
        <input
          type="number"
          id="target"
          name="target"
          disabled={isPending}
          className="mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="$50.00"
          defaultValue={isEditMode ? editablePotFields.target : ""}
        />
        <ZodErrors error={state?.error?.target} />
      </div>

      <div className="py-5">
        <label htmlFor="theme" className="text-sm font-semibold text-gray-900">
          Theme
        </label>

        <select
          name="theme"
          id="theme"
          disabled={isPending}
          className="mt-1 h-10 w-full cursor-pointer rounded-md border border-stone-500 px-4 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          defaultValue={isEditMode ? editablePotFields.theme : ""}
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
        <ZodErrors error={state?.error?.theme} />
      </div>

      <PotButton isEditMode={isEditMode} />
    </form>
  )
}

export function PotButton({ isEditMode }) {
  const state = useFormStatus()

  return (
    <Button
      disabled={state.pending}
      customStyles={`mt-2 w-full text-white  py-3 rounded-md font-bold ${state.pending ? "bg-gray-600 cursor-no-drop" : "cursor-pointer bg-gray-900"}`}
    >
      {isEditMode
        ? state.pending
          ? "Editing Pot..."
          : "Edit Pot"
        : !state.pending
          ? "Create Pot"
          : "Creating Pot..."}
    </Button>
  )
}

export default CreatePotForm
