"use client"

import { sortOptions } from "@/app/data/appData"
import Image from "next/image"
import SearchBar from "../SearchBar"
import SortBy from "../SortBy"

function BillsTableOperations({ transactions, recurring, setShowSort }) {
  return (
    <div className="flex items-center justify-between gap-x-4 py-3">
      <SearchBar
        maxWidth={300}
        placeholder="Search bill..."
        transactions={transactions}
        disabled={recurring?.length === 0}
      />

      <div className="max-[506px]:hidden">
        <SortBy
          disabled={recurring?.length === 0}
          recurring={recurring}
          label={true}
          options={sortOptions}
        />
      </div>

      <div className="min-[507px]:hidden">
        <Image
          src="./icon-sort-mobile.svg"
          width={30}
          height={30}
          alt="icon-sort"
          onClick={() => setShowSort((show) => !show)}
          className="brightness-0 filter"
        />
      </div>
    </div>
  )
}

export default BillsTableOperations
