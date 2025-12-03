"use client"

import { handleDeletePot } from "@/app/_lib/actions/deletePot"
import { useTransition } from "react"
import toast from "react-hot-toast"
import { useModal } from "../ClickContext"

function DeletePotModal({ onCloseModal }) {
  const { activePotDelete } = useModal()
  const [isLoading, startDeleteTransition] = useTransition()

  function handleDelete() {
    startDeleteTransition(async function () {
      try {
        await handleDeletePot(activePotDelete.id)
        toast.success("Pot deletion successfull 🗑️")
        onCloseModal?.()
      } catch (err) {
        console.error(err.message)
        toast.error("Failed to delete pot ‼️")
        onCloseModal?.()
      }
    })
  }

  const deletePotWithBinding = handleDelete.bind(null, activePotDelete.id) // Bind Pot ID

  return (
    <div>
      <p className="text-[14px] text-gray-500">
        Are you sure you want to delete this budget? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>
      <div className="my-4">
        <button
          className={`mb-4 mt-5 w-full rounded-md ${isLoading ? "bg-red-200" : "bg-secondary-red"} px-3 py-3 text-[14px] font-bold text-white transition-all hover:bg-red-600 ${isLoading ? "cursor-not-allowed hover:bg-red-200" : "cursor-pointer"}`}
          disabled={isLoading}
          onClick={deletePotWithBinding}
        >
          Yes, Confirm Deletion
        </button>
        <button
          className="w-full rounded-md bg-beige-100 px-3 py-3 text-[14px] font-bold text-gray-900 transition-all hover:bg-gray-100"
          onClick={() => onCloseModal?.()}
        >
          No, I Want To Go Back
        </button>
      </div>
    </div>
  )
}

export default DeletePotModal
