import { Suspense } from "react"
import Spinner from "../Spinner"
import TransactionsRow from "./TransactionsRow"
import TransactionsTable from "./TransactionsTable"
import TransactionTableOperation from "./TransactionTableOperation"
import Pagination from "../Pagination"

export default function TransactionWrapper({
  searchParams,
  transactions,
  count,
}) {
  return (
    <div className="mt-10 w-full rounded-[10px] bg-secondary-white px-8 py-9 max-[469px]:px-3">
      <TransactionTableOperation
        searchParams={searchParams}
        transactions={transactions}
      />
      <TransactionsTable />

      <Suspense fallback={<Spinner />}>
        <TransactionsRow searchParams={searchParams} />
      </Suspense>

      <Pagination transactions={transactions} count={count} />
    </div>
  )
}
