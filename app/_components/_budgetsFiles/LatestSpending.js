"use client"

import { formatCurrency } from "@/app/_utils/helpers"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

const DISPLAYED_TRANSACTIONS = 3

function LatestSpending({ transactions, budgetCategory }) {
  const router = useRouter()

  return (
    <div className="rounded-md bg-beige-100 p-7">
      <header className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Latest Spending</h3>
        <button
          className="flex items-center text-[15px] text-gray-500 hover:text-gray-900"
          onClick={() => router.replace("/transactions")}
        >
          See all{" "}
          <span className="ml-2">
            <img src="/icon-caret-right.svg" />
          </span>
        </button>
      </header>

      <ul className="mt-8">
        {transactions
          ?.filter((transaction) => transaction.category === budgetCategory)
          ?.slice(0, DISPLAYED_TRANSACTIONS)
          ?.map((transaction, i) => (
            <li
              key={transaction.id}
              className={`my-4 flex items-center justify-between max-[816px]:gap-x-4 ${i + 1 === 2 && "border-b-[1px] border-t-[1px]"} border-gray-200 ${i + 1 === 2 && "py-5"}`}
            >
              <div className="flex items-center">
                <div>
                  <img
                    src={transaction.avatar}
                    width={40}
                    height={40}
                    onError={(e) => (e.target.style.display = "none")}
                    className="rounded-[50px]"
                  />
                </div>
                <p className="ml-5 truncate text-[14px] font-bold text-gray-900">
                  {transaction.recipientName || "unknown"}
                </p>
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-900">
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="mt-1 text-[13px] text-gray-500">
                  {format(new Date(transaction.created_at), "dd MMM, yyyy") ||
                    "unknown"}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default LatestSpending
