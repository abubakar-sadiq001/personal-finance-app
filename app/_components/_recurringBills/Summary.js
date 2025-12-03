import { BillsSummary, formatCurrency } from "@/app/_utils/helpers"

function Summary({ bills, totalBills }) {
  return (
    <div className="rounded-md bg-secondary-white px-5 py-4 max-[1237px]:h-full max-[1237px]:w-[50%] max-[588px]:w-full min-[1237px]:mt-5">
      <h2 className="text-[16px] font-bold text-gray-900">Summary</h2>
      <ul className="mt-4 max-[1237px]:mt-0">
        {BillsSummary?.map((bill, i) => (
          <li
            key={bill.name}
            className={`flex items-center justify-between ${i + 1 === BillsSummary.length - 1 && "border-b-[1px] border-t-[1px]"} border-gray-200 py-3 text-[13px]`}
          >
            <p className="text-gray-500">{bill.name}</p>
            <p
              className={`font-bold ${i + 1 === BillsSummary.length ? "text-secondary-red" : "text-gray-900"}`}
            >
              {i + 1 === BillsSummary.length - 2 && bills.length} (
              {formatCurrency(
                i + 1 === BillsSummary.length - 2 ? totalBills : 0
              )}
              )
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Summary
