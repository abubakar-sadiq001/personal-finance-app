"use client"

import { useEffect } from "react"
import Box from "../Box"
import { useModal } from "../ClickContext"
import CreateTransactionForm from "./CreateTransactionForm"

export default function TransactionClientComp({ children }) {
  const { isOpen, handleClose, allCategories } = useModal()

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflowY = isOpen ? "hidden" : original

    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <Box resourceName="Add new transaction" IDname="transactionOverlay">
          <CreateTransactionForm
            allCategories={allCategories}
            onCloseModal={handleClose}
          />
        </Box>
      )}
      {children}
    </>
  )
}
