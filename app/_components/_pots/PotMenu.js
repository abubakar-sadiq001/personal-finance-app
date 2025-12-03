"use client"

import { useEffect, useRef, useState } from "react"
import { useModal } from "../ClickContext"
import MenuBtn from "../_budgetsFiles/MenuBtn"

function RenderMenuBtn({ children, currentPot }) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef()
  const { handleOpen, handleOpenPotDelete } = useModal()

  function handleOpenEdit() {
    handleOpen(null, currentPot)
  }

  function handleShowDelete() {
    handleOpenPotDelete(currentPot)
  }

  useEffect(
    function () {
      function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false)
        }
      }

      if (showMenu) {
        document.addEventListener("click", handleClickOutside)
      }

      return () => {
        document.removeEventListener("click", handleClickOutside)
      }
    },
    [showMenu]
  )

  return (
    <div ref={menuRef}>
      {showMenu && (
        <div className="absolute right-3 top-8 block w-[130px] rounded-md bg-white px-3 py-1 text-gray-900 shadow-2xl">
          <p
            className="cursor-pointer py-2 text-[14px] text-gray-900 hover:text-gray-500"
            onClick={handleOpenEdit}
          >
            Edit Budget
          </p>
          <p
            className="cursor-pointer border-t-[1px] py-2 text-[14px] text-secondary-red hover:text-red-800"
            onClick={handleShowDelete}
          >
            Delete Budget
          </p>
        </div>
      )}

      <MenuBtn setShowMenu={setShowMenu} />
      {children}
    </div>
  )
}

export default RenderMenuBtn
