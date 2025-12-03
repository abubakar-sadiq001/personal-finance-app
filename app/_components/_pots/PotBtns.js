"use client"

import { useModal } from "../ClickContext"

function PotBtns({ pot }) {
  const { handleOpenPotModal } = useModal()

  return (
    <div className="mt-10 flex items-center gap-3">
      <button
        className="w-full rounded-md bg-beige-100 p-3 text-[14px] font-bold text-gray-900 transition-all"
        onClick={() => handleOpenPotModal(pot, "addMoney")}
      >
        + Add Money
      </button>
      <button
        className="w-full rounded-md bg-beige-100 p-3 text-[14px] font-bold text-gray-900 transition-all"
        onClick={() => handleOpenPotModal(pot, "withdrawMoney")}
      >
        + Withdraw
      </button>
    </div>
  )
}

export default PotBtns
