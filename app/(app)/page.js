import Header from "../_components/Header"
import Heading from "../_components/Heading"
import Bills from "../_components/_dashboard/Bills"
import Budgets from "../_components/_dashboard/Budgets"
import CurrentBalance from "../_components/_dashboard/CurrentBalance"
import Expenses from "../_components/_dashboard/Expenses"
import Income from "../_components/_dashboard/Income"
import Pots from "../_components/_dashboard/Pots"
import Transactions from "../_components/_dashboard/Transactions"
// import { auth } from "../_lib/auth"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getPots, getTransactionsExplicitly } from "../_lib/data-services"
import DashboardClientComp from "../_components/_dashboard/DashboardClientComp"

async function Home() {
  const session = await auth()
  console.log(session)
  const transactions = await getTransactionsExplicitly()

  // TOTAL BILLS
  const totalBills =
    transactions
      ?.filter((transaction) => transaction.isRecurring === true)
      ?.map((transaction) => transaction.amount)
      ?.reduce((acc, cur) => acc + cur, 0) || 0

  // POTS DATA
  const pots = await getPots()

  // CURRENT BALANCE
  const currentBalance =
    transactions
      ?.map((transaction) => transaction.amount)
      .reduce((acc, sum) => acc + sum, 0) || 0

  // TOTAL INCOME
  const income =
    transactions
      ?.filter((transaction) => transaction.isRecurring === false)
      ?.map((transaction) => transaction.amount)
      ?.reduce((acc, cur) => acc + cur, 0) || 0

  if (!session) redirect("/signin")

  return (
    <div className="mb-[150px] max-[800px]:mb-[200px]">
      <Header>
        <Heading
          headingName="Overview"
          buttonName="Logout"
          src="/log-in-outline.svg"
        />
      </Header>

      <div className="mt-7 flex items-center gap-x-4 max-[808px]:flex-col max-[808px]:gap-y-3">
        <CurrentBalance currentBalance={currentBalance} />
        <Income income={income} />
        <Expenses />
      </div>

      <div className="mt-6 grid grid-cols-4 gap-5">
        <DashboardClientComp>
          <Pots pots={pots} />
          <Budgets />
          <Transactions />
        </DashboardClientComp>
        <Bills totalBills={totalBills} />
      </div>
    </div>
  )
}

export default Home
