"use client"

import { formatCurrency } from "@/app/_utils/helpers"
import PotMenu from "../_pots/PotMenu"
import PotBtns from "./PotBtns"
import PotsRange from "./PotsRange"
import Empty from "../Empty"

function PotsList({ pots }) {
  //4️⃣ If still no data at all (and not searching), show nothing or a simple message
  if (pots.length === 0)
    return (
      <div className="w-full max-w-[100%] rounded-md bg-beige-100 p-7">
        <Empty resourceName="pots" bg="bg-secondary-white" />
      </div>
    )

  return (
    <ul className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-1 max-[768px]:gap-y-2">
      {pots?.map((pot) => (
        <li key={pot.id} className="mb-6 rounded-md bg-white p-5">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div
                className="h-[16px] w-[16px] rounded-[50px]"
                style={{ backgroundColor: pot.theme }}
              ></div>
              <h1 className="truncate text-[17px] font-bold capitalize text-gray-900">
                {pot.potName}
              </h1>
            </div>
            <div className="relative">
              <PotMenu currentPot={pot} />
            </div>
          </header>

          <div className="mb-4 mt-8 flex items-center justify-between">
            <p className="text-[13px] text-gray-500">Total Saved</p>
            <h1 className="text-[25px] font-bold text-gray-900">
              {formatCurrency(pot.totalSaved)}
            </h1>
          </div>

          <PotsRange pot={pot} />

          <PotBtns pot={pot} />
        </li>
      ))}
    </ul>
  )
}

export default PotsList
