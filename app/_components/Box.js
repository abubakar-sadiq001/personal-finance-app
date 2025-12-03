"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useModal } from "./ClickContext"

function Box({ resourceName, onClose, children, IDname }) {
  const [mounted, setMounted] = useState(false)
  const {
    handleClose,
    handleCloseDelete,
    handleClosePotModal,
    handleClosePotDelete,
  } = useModal()

  function handleClick(e) {
    if (e.target.id !== IDname) return

    handleClose()
    handleCloseDelete()
    handleClosePotModal()
    handleClosePotDelete()
  }

  useEffect(function () {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      onClick={handleClick}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-[2.5px] transition-all"
      id={IDname}
    >
      <div className="relative my-[50px] max-h-[500px] w-[90%] max-w-[500px] overflow-y-scroll rounded-[6px] bg-white p-6 shadow-xl">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold capitalize">{resourceName}</h1>
          <button
            onClick={() => {
              handleClose()
              handleCloseDelete()
              handleClosePotModal()
              handleClosePotDelete()
            }}
            className="absolute right-4 top-2 flex h-6 w-6 items-center justify-center rounded-[50px] border border-gray-900 text-3xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </header>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Box
