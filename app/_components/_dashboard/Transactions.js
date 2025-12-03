import { getTransactionsExplicitly } from "@/app/_lib/data-services"
import { formatCurrency } from "@/app/_utils/helpers"
import { formatDate } from "date-fns"
import Empty from "../Empty"
import BoxHeading from "./BoxHeading"

async function Transactions() {
  const transactions = await getTransactionsExplicitly()

  return (
    <div className="col-span-2 row-span-2 w-full rounded-md bg-secondary-white px-6 py-5 max-[808px]:col-span-4 max-[808px]:row-start-2">
      <BoxHeading name="Transactions" url="transactions" />

      {transactions?.length !== 0 ? (
        <ul className="mt-4">
          {transactions
            ?.filter((transaction) => transaction)
            ?.slice(0, 5)
            ?.map((transaction, i) => (
              <li
                key={transaction.id}
                className={`flex items-center justify-between ${i < 4 && "border-b"} py-4`}
              >
                <div className="flex items-center">
                  <div>
                    <img
                      src={transaction.avatar}
                      width={32}
                      height={32}
                      className="mr-4 rounded-[50px]"
                      alt={`${transaction.recipientName} avatar`}
                    />
                  </div>
                  <p className="text-[13px] font-bold text-gray-900">
                    {transaction.recipientName}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] font-bold text-gray-900">
                    {transaction.amount >= 1000
                      ? `$${(transaction.amount / 1000).toFixed(1)}k`
                      : formatCurrency(transaction.amount)}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {formatDate(
                      new Date(transaction.created_at),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="mt-4 w-full max-w-[100%] rounded-md bg-beige-100 p-7">
          <Empty resourceName="transactions" bg="bg-beige-100" />
        </div>
      )}
    </div>
  )
}

export default Transactions
