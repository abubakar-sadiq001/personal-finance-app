"use client"

import { formatCurrency } from "@/app/_utils/helpers"
import Chart from "./Chart"
import Empty from "../Empty"

function BudgetsStats({ budgets, transactions }) {
  // TOTAL BUDGET SPENT
  const totalBudgetSpent = transactions
    ?.map((transaction) => transaction.amount)
    .reduce((acc, sum) => acc + sum, 0)

  // TOTAL BUDGET LIMIT
  const totalLimit = budgets
    ?.map((budget) => budget.maxSpend)
    .reduce((acc, sum) => acc + sum, 0)

  // CHART DATA
  const data = budgets.map((budget) => {
    return {
      category: budget.category,
      percentageValue: Number(
        ((budget.maxSpend / totalLimit) * 100).toFixed(1)
      ),

      themeColor: budget.themeColor,
    }
  })

  // 4️⃣ If still no data at all (and not searching), show nothing or a simple message
  if (budgets.length === 0 || transactions.length === 0)
    return (
      <div className="w-full max-w-[100%] rounded-md bg-beige-100 p-7">
        <Empty resourceName="charts" bg="bg-secondary-white" />
        {/* <p className="my-2 text-center text-[13px] text-gray-500">
          Add budget to see stats.
        </p> */}
      </div>
    )

  return (
    <div className="w-full max-w-[40%] rounded-md bg-white px-8 py-5 max-[816px]:max-w-[100%]">
      <Chart
        data={data}
        totalBudgetSpent={totalBudgetSpent}
        totalLimit={totalLimit}
        cx="50%"
        cy="45%"
        containerWidth="100%"
        containerHeight="300"
      />

      <div>
        <h2 className="text-[20px] font-bold text-gray-900">
          Spending Summary
        </h2>

        <ul className="mt-3">
          {budgets?.map((budget) => (
            <li
              key={budget.id}
              className="flex items-center justify-between border-b-[1px] border-gray-100 py-3"
            >
              <div>
                <p
                  className="border-l-4 pl-4 text-sm text-gray-500"
                  style={{
                    borderColor: budget.themeColor,
                  }}
                >
                  {budget.category}
                </p>
              </div>
              <div>
                <span className="mr-2 text-[14px] font-bold text-gray-900">
                  {formatCurrency(
                    transactions
                      .filter(
                        (transaction) =>
                          transaction.category === budget.category
                      )
                      ?.slice(0, 3)
                      ?.map((transaction) => transaction.amount)
                      .reduce((acc, sum) => acc + sum, 0)
                  )}
                </span>
                <span className="text-[12px] text-gray-500">
                  of {formatCurrency(budget.maxSpend)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BudgetsStats
