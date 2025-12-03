// "use client"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import BudgetsClientComp from "../../_components/_budgetsFiles/BudgetsClientComp"
import BudgetsList from "../../_components/_budgetsFiles/BudgetsList"
import BudgetsStats from "../../_components/_budgetsFiles/BudgetsStats"
import Header from "../../_components/Header"
import Heading from "../../_components/Heading"
import SpinnerMini from "../../_components/SpinnerMini"
import { getBudgets, getTransactionsExplicitly } from "../../_lib/data-services"

async function Page() {
  const session = await auth()

  const budgets = await getBudgets()
  const transactions = await getTransactionsExplicitly()
  const budgetsLength = budgets?.length

  if (!session) redirect("/signin")

  return (
    <div className="mb-[150px] max-[800px]:mb-[200px]">
      <Header>
        <Heading
          headingName={`Budgets (${budgetsLength || 0})`}
          buttonName="&#43; New Budget "
        />
      </Header>

      <div className="mt-9 flex items-start gap-7 max-[816px]:flex-col max-[816px]:items-center">
        <BudgetsStats budgets={budgets} transactions={transactions} />
        {/* <BudgetsList /> */}

        <BudgetsClientComp budgets={budgets}>
          <Suspense fallback={<SpinnerMini />}>
            <BudgetsList budgets={budgets} />
          </Suspense>
        </BudgetsClientComp>
      </div>
    </div>
  )
}

export default Page
