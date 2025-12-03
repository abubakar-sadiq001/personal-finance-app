"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import Select from "./Select"

function FilterBy({ options, disabled, optionalWidth, label }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  function handleFilter(e) {
    const targetValue = e.target.value
    const params = new URLSearchParams(searchParams)
    params.set("category", targetValue)
    params.delete("page") //  reset pagination
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }
  const activeFilter = searchParams.get("category") ?? ""

  return (
    <div className="flex items-center">
      {label && (
        <span className="text-[12px] text-gray-900">Filter by Category</span>
      )}
      <Select
        options={options}
        value={activeFilter}
        disabled={disabled}
        onChange={handleFilter}
        optionalWidth={optionalWidth}
      />
    </div>
  )
}

export default FilterBy
