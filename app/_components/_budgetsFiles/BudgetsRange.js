import { formatCurrency } from "@/app/_utils/helpers"

function BudgetsRange({ maxSpend, budget, transactions, themeColor }) {
  const maxPercentage =
    (transactions
      ?.filter((transaction) => transaction.category === budget.category)
      ?.slice(0, 3)
      ?.map((transaction) => transaction.amount)
      ?.reduce((acc, sum) => acc + sum, 0) /
      maxSpend) *
    100

  return (
    <div className="mb-4 mt-6">
      <p className="mb-4 text-sm text-gray-500">
        Maximum of {formatCurrency(maxSpend)}
      </p>

      <div className="h-7 w-full rounded-xl border border-gray-300 p-[2px]">
        <div
          className="flex h-full items-center justify-center rounded-xl transition-all duration-300 ease-in-out"
          style={{
            width: `${Math.round(maxPercentage)}%`,
            maxWidth: "100%",
            backgroundColor: themeColor,
          }}
        >
          <span className="text-xs font-medium text-white">
            {Math.round(maxPercentage > 100 ? 100 : maxPercentage)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default BudgetsRange
