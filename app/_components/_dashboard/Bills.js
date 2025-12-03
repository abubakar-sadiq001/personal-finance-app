import { BillsSummary, formatCurrency } from "@/app/_utils/helpers"
import BoxHeading from "./BoxHeading"

function Bills({ totalBills }) {
  return (
    <div className="col-span-2 col-start-3 row-start-3 w-full rounded-md bg-secondary-white p-6 max-[808px]:col-span-4 max-[808px]:col-start-1 max-[808px]:row-start-6">
      <BoxHeading name="Recurring Bills" url="recurringBills" />

      <ul className="mt-4">
        {BillsSummary.map((bill, i) => (
          <li
            key={i}
            className="my-3 rounded-md bg-beige-100 px-3 py-4"
            style={{
              borderLeft: `3px solid ${bill.theme}`,
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-gray-500">{bill.name} </p>
              <p className="text-[13px] font-bold text-gray-900">
                {i + 1 === 1 ? formatCurrency(totalBills) : formatCurrency(0)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bills
