import { formatCurrency } from "@/app/_utils/helpers"

function CurrentBalance({ currentBalance }) {
  return (
    <div className="w-full rounded-md bg-gray-900 p-5 text-secondary-white">
      <p className="text-[14px]">Current Balance</p>
      <h1 className="mt-3 text-3xl font-bold">
        {currentBalance >= 35000
          ? `$${(currentBalance / 1000).toFixed(1)}k`
          : formatCurrency(currentBalance)}
      </h1>
    </div>
  )
}

export default CurrentBalance
