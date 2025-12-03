import { auth } from "@/app/api/auth/[...nextauth]/route"
import TransactionClientComp from "../../_components/_transactions/TransactionClientComp"
import Header from "../../_components/Header"
import Heading from "../../_components/Heading"
import TransactionWrapper from "../../_components/_transactions/TransactionsWrapper"
import { getTransactions } from "../../_lib/data-services"
import { redirect } from "next/navigation"

async function Page({ searchParams }) {
  const session = await auth()
  const user_id = Number(session.user.id)
  // console.log(user_id)

  const { data: transactions, count } = await getTransactions({ user_id })
  const resolvedParams = await searchParams

  if (!session) redirect("/signin")

  return (
    <div className="mb-[150px] max-[800px]:mb-[200px]">
      <Header>
        <Heading
          headingName="Transactions"
          buttonName="&#43; New Transaction"
        />
      </Header>

      <div className="flex justify-center">
        <TransactionClientComp>
          <TransactionWrapper
            transactions={transactions}
            count={count}
            searchParams={resolvedParams}
          />
        </TransactionClientComp>
      </div>
    </div>
  )
}

export default Page
