"use client"

import { navLinks } from "../data/appData"
import Image from "next/image"
import Link from "next/link"
import Logo from "./Logo"
import ToggleSideNav from "./ToggleSideNav"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

function SideNavigation({ onOpen, isSideBarOpen }) {
  const [isOpen, setIsOpen] = useState(null)
  const pathname = usePathname()
  const session = useSession()

  const userName = session?.data?.user?.name
  const isLoading = session?.status === "loading"
  // console.log(session)

  return (
    <div
      className={`transition-all duration-300 ease-in-out max-[1000px]:hidden ${isSideBarOpen ? "w-64" : "w-[80px]"} h-full bg-blue-200 shadow-md`}
    >
      <div
        className={`fixed left-0 top-0 h-full overflow-y-auto rounded-br-md rounded-tr-md bg-gray-900 py-2 transition-all duration-300 ease-in-out max-[100px]:bottom-0`}
      >
        <div className={`flex items-center justify-center`}>
          {isLoading ? (
            <p className="h-[20px] w-[120px] animate-pulse rounded-sm bg-gray-600"></p>
          ) : (
            <>
              {isSideBarOpen ? (
                <p className="text-[13px] text-secondary-white">
                  Welcome{" "}
                  {userName?.length > 20
                    ? `${userName.slice(0, 20)}...`
                    : userName}
                  👋
                </p>
              ) : (
                <p className="text-[20px]">👋</p>
              )}
            </>
          )}
        </div>

        <div className="px-7">
          <Logo isSideBarOpen={isSideBarOpen} />
        </div>

        <ul className={`mt-5 ${isSideBarOpen && "pr-7"}`}>
          {navLinks.map((navLink) => (
            <li key={navLink.name} className="mb-5">
              <Link
                href={navLink.href}
                className={`letter flex items-center px-7 py-4 text-[17px] leading-6 tracking-tighter text-gray-300 ${pathname === navLink.href ? `${isSideBarOpen && "rounded-br-lg rounded-tr-lg"} border-l-4 border-secondary-green bg-gray-100 text-gray-900` : ""}`}
              >
                <Image
                  src={
                    pathname === navLink.href
                      ? navLink.iconActive
                      : navLink.iconInActive
                  }
                  alt={navLink.name}
                  width={20}
                  height={20}
                  className={`${isSideBarOpen && "mr-4"}`}
                />
                {!isOpen ? (
                  <span className="text-[17px] font-semibold">
                    {isSideBarOpen && navLink.name}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        <ToggleSideNav onOpen={onOpen} isSideBarOpen={isSideBarOpen} />
      </div>
    </div>
  )
}

export default SideNavigation
