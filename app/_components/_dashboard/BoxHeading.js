"use client"

import { useRouter } from "next/navigation"

function BoxHeading({ name, url }) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold">{name}</h2>
      <button
        className="flex items-center text-[13px] font-bold text-gray-500"
        onClick={() => router.replace(`/${url}`)}
      >
        See Details{" "}
        <span className="ml-3">
          <img src="/icon-caret-right.svg" />
        </span>
      </button>
    </div>
  )
}

export default BoxHeading
