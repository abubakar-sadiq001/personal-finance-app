"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { MAX_DATA_PER_PAGE } from "../_utils/pageSize"

function Pagination({ transactions, count }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)

  const currentPage = !params.get("page") ? 1 : Number(params.get("page"))

  // const pageCount = "Data length" / "displayed data per page"
  const pageCount = Math.ceil(count / MAX_DATA_PER_PAGE)

  function handleNext() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1

    params.set("page", next)
    router.replace(`${pathname}?${params.toString()}`)
  }

  function handlePrev() {
    const prev = currentPage > 1 ? currentPage - 1 : 1
    // const prev = pageCount >= currentPage ? currentPage - 1 : currentPage

    params.set("page", prev)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <footer className="mt-[40px] flex items-center justify-between max-[490px]:overflow-x-auto">
      <button
        onClick={handlePrev}
        className={`flex items-center rounded-md border-[1px] border-gray-500 px-4 py-2 text-[12px] ${currentPage === 1 ? "cursor-no-drop" : "cursor-pointer"} `}
        disabled={currentPage === 1}
      >
        <span className="mr-3 font-bold">&lt;</span> prev
      </button>

      <ul className="flex items-center gap-2 text-center max-[436px]:px-5">
        <li className="min-w-[45px] rounded-lg bg-gray-900 px-3 py-1 text-center text-white shadow-sm">
          {(currentPage - 1) * MAX_DATA_PER_PAGE + 1}
        </li>
        <li className="text-gray-900">to</li>
        <li className="min-w-[45px] rounded-lg bg-gray-900 px-3 py-1 text-center text-white shadow-sm">
          {currentPage === pageCount
            ? count || 0
            : currentPage * MAX_DATA_PER_PAGE}
        </li>
        <li className="text-gray-900">of</li>
        <li className="min-w-[45px] rounded-lg bg-gray-900 px-3 py-1 text-center text-white shadow-sm">
          {count}
        </li>
      </ul>

      <button
        onClick={handleNext}
        className={`flex items-center rounded-md border-[1px] border-gray-500 px-4 py-2 text-[12px] ${currentPage === pageCount ? "cursor-no-drop" : "cursor-pointer"}`}
        disabled={currentPage === pageCount || !transactions?.length}
      >
        next <span className="ml-3 font-bold">&gt;</span>
      </button>
    </footer>
  )
}

export default Pagination
