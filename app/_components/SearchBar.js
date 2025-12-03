"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

function SearchBar({ placeholder, maxWidth, disabled }) {
  const [query, setQuery] = useState("")

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const sortParam = searchParams.get("sortBy")

  useEffect(() => {
    setQuery("")

    const params = new URLSearchParams(searchParams)
    if (params.has("query")) {
      params.delete("query")
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [sortParam])

  function handleSearch(e) {
    const value = e.target.value
    setQuery(value)

    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("query", value)
    } else {
      params.delete("query")
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
    router.refresh()
  }

  return (
    <input
      type="search"
      id="query"
      name="search"
      placeholder={placeholder}
      maxLength={30}
      value={query}
      disabled={disabled}
      onChange={handleSearch}
      className={`w-full rounded-lg border border-gray-500 px-4 py-2 ring-gray-900 ring-offset-1 focus:outline-0 focus:ring-2 focus:ring-offset-2`}
      style={{
        maxWidth: `${maxWidth}px`,
      }}
    />
  )
}

export default SearchBar
