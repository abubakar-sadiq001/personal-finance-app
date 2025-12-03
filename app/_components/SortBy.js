"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Select from "./Select"

function SortBy({ options, disabled, optionalWidth, label }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  function handleSort(e) {
    const value = e.target.value
    const params = new URLSearchParams(searchParams)
    params.delete("query")

    if (value) params.set("sortBy", value)
    else {
      params.delete("sortBy")
    }
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  const activeSortValue = searchParams.get("sortBy")

  return (
    <div className="flex items-center">
      {label && <span className="text-[12px] text-gray-900">Sort by</span>}

      <Select
        options={options}
        onChange={handleSort}
        value={activeSortValue}
        disabled={disabled}
        optionalWidth={optionalWidth}
      />
    </div>
  )
}

export default SortBy
