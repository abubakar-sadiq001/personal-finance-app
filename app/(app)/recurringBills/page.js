import { auth } from "@/app/api/auth/[...nextauth]/route"
import BillsWrapper from "../../_components/_recurringBills/BillsWrapper"
import Summary from "../../_components/_recurringBills/Summary"
import TotalBills from "../../_components/_recurringBills/TotalBills"
import Heading from "../../_components/Heading"
import { getTransactions } from "../../_lib/data-services"
import { redirect } from "next/navigation"

async function Page({ searchParams }) {
  const session = await auth()

  const urlParams = await searchParams
  const query = await urlParams.query

  const [field, direction] = urlParams?.sortBy?.split("-") || [
    "created_at",
    "desc",
  ]

  // SORTING LOGIC
  const sortBy = {
    field,
    direction,
  }
  const { data: transactions } = await getTransactions({ sortBy })

  // TOTAL BILLS
  const totalBills =
    transactions
      ?.filter((transaction) => transaction.isRecurring === true)
      ?.map((transaction) => transaction.amount)
      ?.reduce((acc, cur) => acc + cur, 0) || 0

  const recurringTransactionsLength = transactions?.filter(
    (transaction) => transaction.isRecurring === true
  )

  if (!session) redirect("/signin")

  return (
    <div className="mb-[150px] max-[800px]:mb-[200px]">
      <Heading headingName="Recurring Bills" buttonName={null}></Heading>

      <div className="mt-[35px] flex w-[100%] gap-x-6 max-[1237px]:flex-col max-[1237px]:gap-y-4">
        <div className="w-[35%] max-[1237px]:flex max-[1237px]:h-[180px] max-[1237px]:w-full max-[1237px]:items-center max-[1237px]:gap-x-4 max-[588px]:h-full max-[588px]:flex-col max-[588px]:gap-y-4">
          <TotalBills totalBills={totalBills} />
          <Summary
            bills={recurringTransactionsLength}
            totalBills={totalBills}
          />
        </div>

        <BillsWrapper transactions={transactions} query={query} />
      </div>
    </div>
  )
}

export default Page
