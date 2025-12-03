"use client"

import { useState } from "react"
import SideNavigation from "../_components/SideNavigation"
import MobileNav from "../_components/Mobile-nav"

export default function AppLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="relative flex justify-center max-[1000px]:justify-center">
      <SideNavigation onOpen={setIsOpen} isSideBarOpen={isOpen} />
      <MobileNav isSideBarOpen={isOpen} />

      <div className="ml-[30px] w-full overflow-y-auto p-4 max-[1000px]:ml-0">
        {children}
      </div>
    </div>
  )
}
