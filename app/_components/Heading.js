"use client"

import Image from "next/image"
import Button from "./Button"
import { useModal } from "./ClickContext"
import { handleSignout } from "../_lib/actions/signout"
import { useTransition } from "react"

function Heading({ headingName, buttonName, src }) {
  const [isPending, startTransition] = useTransition()

  const { handleOpen } = useModal()

  function signOut() {
    startTransition(() => {
      handleSignout()
    })
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 max-[420px]:text-2xl">
          {headingName}
        </h1>
        {buttonName === "Logout" && (
          <p className="text-[13px] text-gray-500 max-[646px]:hidden">
            A quick look at your accounts, pots, budgets, bills, and recent
            transactions.
          </p>
        )}
      </div>
      {buttonName != null && (
        <Button
          onClick={buttonName === "Logout" ? signOut : handleOpen}
          iconSrc={src}
          disabled={isPending}
          customStyles={`max-[420px]:text-[13px] px-5 max-[420px]:px-3 max-[420px]:py-2 text-white py-3 rounded-md font-bold cursor-pointer bg-gray-900 ${isPending ? "cursor-progress" : "cursor-pointer"}`}
        >
          {src != null && (
            <Image
              src={src}
              width={20}
              height={20}
              alt="logout-icon"
              className="mr-3 brightness-0 invert"
            />
          )}{" "}
          {buttonName}
        </Button>
      )}
    </>
  )
}

export default Heading
