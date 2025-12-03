"use client"

import { formatCurrency } from "@/app/_utils/helpers"
import { useModal } from "../ClickContext"

function PotsRange({ pot, amount, activeBtnName }) {
  const { isPotModal } = useModal()

  const calculatedInputVal =
    activeBtnName === "addMoney"
      ? pot.totalSaved + Number(amount || 0)
      : pot.totalSaved - Number(amount || 0)

  const percentage =
    pot.target > 0 ? Math.min((calculatedInputVal / pot.target) * 100, 100) : 0

  const addProgressBg = "#22c55e"
  const withdrawProgressBg = "#c94736"

  return (
    // <div className="my-8">
    //   <div className="mb-3 h-3 w-full rounded-xl bg-beige-100">
    //     <div
    //       className="relative flex h-full items-center justify-center rounded-xl transition-all duration-300 ease-in-out"
    //       style={{
    //         width: `${percentage}%`,
    //         maxWidth: "100%",
    //         backgroundColor: pot.theme,
    //       }}
    //     >
    //       <div className="before:absolute before:left-0 before:h-5 before:w-3 before:bg-purple-800"></div>
    //     </div>
    //   </div>
    <div className="my-8">
      <div className="relative mb-3 h-3 w-full overflow-hidden rounded-xl bg-beige-100">
        {/* Old saved progress */}
        <div
          className="absolute left-0 top-0 h-full transition-all duration-300 ease-in-out"
          style={{
            width: `${(pot.totalSaved / pot.target) * 100}%`,
            backgroundColor: pot.theme, // e.g. main color
          }}
        ></div>

        {/* New added progress */}
        <div
          className={`absolute left-0 top-0 h-full border-l-2 transition-all duration-300 ease-in-out`}
          style={{
            left: `${activeBtnName === "addMoney" ? (pot.totalSaved / pot.target) * 100 : (calculatedInputVal / pot.target) * 100}%`, // start where saved ends
            width: `${(Number(amount) / pot.target) * 100}%`, // only new portion width
            backgroundColor:
              activeBtnName === "addMoney"
                ? isPotModal && addProgressBg
                : isPotModal && withdrawProgressBg,
            zIndex: 2,
          }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-gray-500">
        <p className="text-[13px] font-bold">{`${percentage.toFixed(1)}%`}</p>
        <p className="text-[13px]"> Target of {formatCurrency(pot.target)}</p>
      </div>
    </div>
  )
}

export default PotsRange
