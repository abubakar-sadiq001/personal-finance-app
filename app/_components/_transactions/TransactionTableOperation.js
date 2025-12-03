"use client"

import { filterOptions, sortOptions } from "@/app/data/appData"
import Image from "next/image"
import { useState } from "react"
import FilterBy from "../FilterBy"
import MobileFilter from "../MobileFilter"
import MobileSort from "../MobileSort"
import SearchBar from "../SearchBar"
import SortBy from "../SortBy"

function TransactionTableOperation({ searchParams, transactions }) {
  const [showFilter, setShowFilter] = useState(false)
  const [showSort, setShowSort] = useState(false)

  return (
    <div>
      <div className="mb-[40px] mt-2 flex items-center justify-between gap-x-4">
        <SearchBar
          searchQueryVal={searchParams}
          maxWidth={400}
          placeholder="Search transaction..."
          disabled={transactions?.length === 0}
        />

        <div className="flex items-center gap-4 max-[924px]:hidden">
          <FilterBy
            disabled={transactions?.length === 0}
            filteredField=""
            options={filterOptions}
            optionalWidth="100%"
            label={true}
          />

          <SortBy
            disabled={transactions?.length === 0}
            label={true}
            options={sortOptions}
          />
        </div>

        <div className="flex items-center gap-x-7 min-[925px]:hidden">
          <Image
            src="./icon-sort-mobile.svg"
            width={30}
            height={30}
            alt="icon-sort"
            className="brightness-0 filter"
            onClick={() => setShowFilter((show) => !show)}
          />
          <Image
            src="./icon-filter-mobile.svg"
            width={30}
            height={30}
            alt="icon-filter"
            className="brightness-0 filter"
            onClick={() => setShowSort((show) => !show)}
          />
        </div>
      </div>
      {showFilter && <MobileFilter />}

      {showSort && <MobileSort />}
    </div>
  )
}

export default TransactionTableOperation
