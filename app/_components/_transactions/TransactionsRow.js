import TransactionsList from "./TransactionsList"
import { getTransactions } from "../../_lib/data-services"
import Empty from "../Empty"

async function TransactionsRow({ searchParams }) {
  const filterParams = searchParams?.category || "all"
  const searchQueryParams = searchParams?.query
  const pageParams = searchParams?.page || 1

  const [field, direction] = searchParams?.sortBy?.split("-") || [
    "created_at",
    "desc",
  ]

  // SORTING LOGIC
  const sortBy = {
    field,
    direction,
  }

  const allTransactions = await getTransactions({
    sortBy,
    page: pageParams || 1,
    category: filterParams,
  })
  const transactions = allTransactions.data || []

  let displayedTransaction

  // SEARCH LOGIC
  if (searchQueryParams && searchQueryParams != null) {
    displayedTransaction = transactions?.filter((transaction) =>
      transaction.recipientName
        ?.toLowerCase()
        .includes(searchQueryParams?.toLowerCase())
    )
  } else if (!searchQueryParams) {
    displayedTransaction = transactions
  }

  // 3️⃣ Show "no results" only if search query exists but found nothing
  if (searchQueryParams && displayedTransaction.length === 0)
    return (
      <div className="mx-auto my-[100px] flex flex-col items-center">
        <div className="flex items-center space-x-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-800">
          <span className="text-2xl">🚫</span>
          <div>
            <strong className="block">Oops!</strong>
            No user named{" "}
            <span className="rounded bg-red-200 px-1 font-bold text-red-600">
              {`"${searchQueryParams && searchQueryParams.slice(0, 10)}..."`}
            </span>{" "}
            found!
            <div>
              <span className="italic text-yellow-600">
                Your search skills need a serious <em>glow-up</em>, champ! 🔥
              </span>
            </div>
          </div>
        </div>
      </div>
    )

  // 4️⃣ If still no data at all (and not searching), show nothing or a simple message
  if (displayedTransaction.length === 0)
    return (
      <div className="mt-10 text-center text-gray-500">
        <Empty resourceName="transactions" bg="bg-beige-100" />
      </div>
    )

  return (
    <ul className="my-2">
      {displayedTransaction?.map((transaction) => (
        <TransactionsList
          key={transaction.id}
          transaction={transaction}
          query={searchQueryParams}
          displayedTransaction={displayedTransaction}
        />
      ))}
    </ul>
  )
}

export default TransactionsRow
