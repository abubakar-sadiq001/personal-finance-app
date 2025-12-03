"use client"

import { handleDeposit } from "@/app/_lib/actions/addPotMoney"
import { handleWithdraw } from "@/app/_lib/actions/widthdrawPotMoney"
import { formatCurrency } from "@/app/_utils/helpers"
import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import toast from "react-hot-toast"
import Button from "../Button"
import { useModal } from "../ClickContext"
import { ZodErrors } from "../ZodErrors"
import PotsRange from "./PotsRange"

const initialState = { success: false, error: null }

function AddAndWithdrawForm({ currentPot, activeBtnName }) {
  const [amount, setAmount] = useState("")
  const totalSaved = currentPot.totalSaved ?? 0

  const [state, formAction, isPending] = useActionState(
    activeBtnName === "addMoney" ? handleDeposit : handleWithdraw,
    initialState
  )

  const isLoading = isPending

  const { handleClosePotModal } = useModal()

  // SHOW NOTIFICATION WITH STATUS
  useEffect(
    function () {
      if (state?.success) {
        toast.success(`Changes Updated 🎉`)
        handleClosePotModal?.()
      }
      if (state?.error) {
        toast.error(`Oops ‼️`)
      }
    },
    [state, handleClosePotModal]
  )

  const maxAmount =
    activeBtnName === "addMoney" ? currentPot.target - totalSaved : totalSaved

  function handleChange(e) {
    const value = e.target.value

    if (value < 0) return

    if (value > maxAmount) {
      setAmount(maxAmount)
    } else {
      setAmount(value)
    }
  }

  function handleMouseWheel(e) {
    e.target.blur()
  }

  return (
    <form action={formAction}>
      <p className="text-[13px] text-gray-500">
        {activeBtnName === "addMoney"
          ? "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
          : "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."}
      </p>

      <div className="mb-2 mt-8 flex items-center justify-between">
        <p className="text-[13px] text-gray-500">New Amount</p>
        <h1 className="text-[27px] font-bold text-gray-900">
          {formatCurrency(
            activeBtnName === "addMoney"
              ? currentPot.totalSaved + Number(amount)
              : currentPot.totalSaved - Number(amount)
          )}
        </h1>
      </div>

      <PotsRange
        pot={currentPot}
        amount={amount}
        activeBtnName={activeBtnName}
      />

      <input type="hidden" name="potID" value={currentPot.id} />

      <div>
        <label
          htmlFor="totalSaved"
          className="text-sm font-semibold text-gray-900"
        >
          Amount to {activeBtnName === "addMoney" ? "Add" : "Withdraw"} ($)
        </label>
        <input
          type="number"
          id="totalSaved"
          value={amount ?? ""}
          disabled={isLoading}
          onChange={handleChange}
          onWheel={handleMouseWheel}
          name="totalSaved"
          className="mb-1 mt-1 h-10 w-full rounded-md border border-stone-500 px-4 py-3 text-gray-500 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2"
          placeholder="$50.00"
        />
        <ZodErrors error={state?.error?.totalSaved} />
      </div>

      <PotsBtn activeBtnName={activeBtnName} />
    </form>
  )
}

export function PotsBtn({ activeBtnName }) {
  const state = useFormStatus()

  return (
    <Button
      disabled={state.pending}
      customStyles={`mt-2 w-full text-white  py-3 rounded-md font-bold ${state.pending ? "bg-gray-600 cursor-no-drop" : "cursor-pointer bg-gray-900"}`}
    >
      {state.pending
        ? ` ${activeBtnName === "addMoney" ? "Adding" : "Withdrawing"} Funds...`
        : ` ${activeBtnName === "addMoney" ? " Add " : "Withdraw"} Funds`}
    </Button>
  )
}

export default AddAndWithdrawForm
