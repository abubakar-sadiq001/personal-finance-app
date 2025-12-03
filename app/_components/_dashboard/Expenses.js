import { formatCurrency } from "@/app/_utils/helpers"

function Expenses() {
  return (
    <div className="w-full rounded-md bg-secondary-white p-5 text-gray-900">
      <p className="text-[14px] text-gray-500">Expenses</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900">
        {formatCurrency(0)}
      </h1>
    </div>
  )
}

export default Expenses
