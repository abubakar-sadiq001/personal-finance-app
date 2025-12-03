import { formatCurrency } from "@/app/_utils/helpers"

function Income({ income }) {
  return (
    <div className="w-full rounded-md bg-secondary-white p-5">
      <p className="text-[14px] text-gray-500">Income</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900">
        {income >= 35000
          ? `$${(income / 1000).toFixed(1)}k`
          : formatCurrency(income)}
      </h1>
    </div>
  )
}

export default Income
