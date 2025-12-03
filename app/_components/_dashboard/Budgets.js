import { getBudgets, getTransactionsExplicitly } from "@/app/_lib/data-services"
import Chart from "../_budgetsFiles/Chart"
import { formatCurrency } from "@/app/_utils/helpers"
import Empty from "../Empty"
import BoxHeading from "./BoxHeading"

async function Budgets() {
  const budgets = await getBudgets()
  const transactions = await getTransactionsExplicitly()

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

  return (
    <div className="col-span-2 row-span-2 rounded-md bg-secondary-white px-6 py-5 max-[808px]:col-span-4 max-[808px]:row-start-4">
      <BoxHeading name="Budgets" url="budgets" />

      {budgets?.length !== 0 ? (
        <div className="mb-4 mt-5 flex items-center justify-center">
          <div className="w-[300px]">
            <Chart
              data={data}
              totalBudgetSpent={totalBudgetSpent}
              totalLimit={totalLimit}
              cx="50%"
              cy="50%"
              containerWidth="90%"
              containerHeight="250"
              innerVal="60%"
              outerVal="100%"
            />
          </div>

          <ul>
            {budgets.map((budget) => (
              <li key={budget.id} className="my-2 flex">
                <div
                  style={{
                    width: "3px",
                    height: "35px",
                    borderRadius: "60px",
                    backgroundColor: budget.themeColor,
                  }}
                ></div>
                <div
                  style={{
                    paddingLeft: "7px",
                  }}
                >
                  <p className="text-[12px] text-gray-500">{budget.category}</p>
                  <h3 className="text-[13px] font-bold text-gray-900">
                    {formatCurrency(budget.maxSpend)}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-5 w-full max-w-[100%] rounded-md bg-beige-100 p-6">
          <Empty resourceName="budgets" bg="bg-beige-100" />
        </div>
      )}
    </div>
  )
}

export default Budgets
