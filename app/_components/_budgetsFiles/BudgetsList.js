import { getTransactionsExplicitly } from "@/app/_lib/data-services"
import { formatCurrency } from "@/app/_utils/helpers"
import BudgetsRange from "./BudgetsRange"
import LatestSpending from "./LatestSpending"
import RenderMenuBtn from "./RenderMenuBtns"
import Empty from "../Empty"

async function BudgetsList({ budgets }) {
  const transactions = await getTransactionsExplicitly()

  // 4️⃣ If still no data at all (and not searching), show nothing or a simple message
  if (budgets.length === 0)
    return (
      <div className="w-full max-w-[100%] rounded-md bg-beige-100 p-7">
        <Empty resourceName="budgets" bg="bg-secondary-white" />
      </div>
    )

  return (
    <div className="w-full max-w-[100%]">
      <ul className="w-full">
        {budgets?.map((budget) => (
          <li className="mb-6 rounded-md bg-white p-8" key={budget.id}>
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div
                  className="h-[16px] w-[16px] rounded-[50px]"
                  style={{ backgroundColor: budget.themeColor }}
                ></div>
                <h1 className="text-xl font-bold text-gray-900">
                  {budget.category}
                </h1>
              </div>
              <div className="relative">
                <RenderMenuBtn currentBudget={budget} />
              </div>
            </header>

            <BudgetsRange
              maxSpend={budget.maxSpend}
              budget={budget}
              transactions={transactions}
              themeColor={budget.themeColor}
            />

            <div className="relative my-5 flex">
              <div className="w-[50%] pl-3.5 before:absolute before:bottom-0 before:left-0 before:top-0 before:h-[90%] before:w-[4px] before:rounded-2xl before:bg-secondary-green">
                <p className="mb-1 text-[12px] text-gray-500">Spent</p>
                <p className="text-[14px] font-bold text-gray-900">
                  {formatCurrency(
                    transactions
                      ?.filter(
                        (transaction) =>
                          transaction.category === budget.category
                      )
                      ?.slice(0, 3)
                      ?.map((transaction) => transaction.amount)
                      ?.reduce((acc, sum) => acc + sum, 0)
                  )}
                </p>
              </div>
              <div className="w-[50%] pl-3.5 before:absolute before:bottom-0 before:left-[50%] before:top-0 before:h-[90%] before:w-[4px] before:rounded-2xl before:bg-beige-100">
                <p className="mb-1 text-[12px] text-gray-500">Remaining</p>
                <p className="text-[14px] font-bold text-gray-900">
                  {formatCurrency(
                    budget.maxSpend -
                      transactions
                        ?.filter(
                          (transaction) =>
                            transaction.category === budget.category
                        )
                        ?.slice(0, 3)
                        ?.map((transaction) => transaction.amount)
                        ?.reduce((acc, sum) => acc + sum, 0)
                  )}
                </p>
              </div>
            </div>

            {/* <SpendingRenderLogic> */}
            <LatestSpending
              budgetCategory={budget.category}
              transactions={transactions}
            />
            {/* </SpendingRenderLogic> */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BudgetsList
