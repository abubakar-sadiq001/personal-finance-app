import Empty from "../Empty"
import BillList from "./BillList"
import BillsListTable from "./BillsListTable"

function BillsRow({ transactions, query }) {
  let displayedBills

  // SEARCH LOGIC
  if (query && query != null) {
    displayedBills = transactions?.filter((transaction) =>
      transaction.recipientName?.toLowerCase().includes(query?.toLowerCase())
    )
  } else if (!query) {
    displayedBills = transactions
  }

  const recurring = displayedBills?.filter(
    (transaction) => transaction.isRecurring === true
  )

  return (
    <div className="mt-3">
      <BillsListTable />

      {recurring.length === 0 ? (
        <div className="w-full max-w-[100%] rounded-md p-7">
          <Empty resourceName="bills" bg="bg-beige-100" />
        </div>
      ) : (
        <ul className="mt-3">
          {displayedBills
            ?.filter((transaction) => transaction.isRecurring === true)
            ?.map((transaction) => (
              <BillList
                recurringTransaction={transaction}
                transactions={transactions}
                key={transaction.id}
              />
            ))}
        </ul>
      )}
    </div>
  )
}

export default BillsRow
