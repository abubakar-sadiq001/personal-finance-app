"use client"

import { Suspense, useState } from "react"
import Spinner from "../Spinner"
import BillsRow from "./BillsRow"
import BillsTableOperations from "./BillsTableOperations"
import SortBy from "../SortBy"
import { options, sortOptions } from "@/app/data/appData"

function BillsWrapper({ transactions, query }) {
  const [showSort, setShowSort] = useState(false)

  const recurring = transactions?.filter(
    (transaction) => transaction.isRecurring === true
  )

  return (
    <div className="w-[65%] rounded-lg bg-secondary-white px-8 py-5 max-[1237px]:w-full max-[572px]:px-4">
      <BillsTableOperations
        transactions={transactions}
        recurring={recurring}
        setShowSort={setShowSort}
      />

      {showSort && (
        <div className="my-4 bg-yellow-200 min-[507px]:hidden">
          <SortBy
            disabled={recurring?.length === 0}
            recurring={recurring}
            optionalWidth="100%"
            label={false}
            options={sortOptions}
          />
        </div>
      )}

      <Suspense fallback={<Spinner />}>
        <BillsRow transactions={transactions} query={query} />
      </Suspense>
    </div>
  )
}

export default BillsWrapper
