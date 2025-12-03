"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getTransactions } from "../_lib/data-services"

const TransactionsContext = createContext()

function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState()

  useEffect(function () {
    async function fetchTransactions() {
      const transactions = await getTransactions()
      setTransactions(transactions)
    }
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext value={transactions}>{children}</TransactionsContext>
  )
}

function useTransaction() {
  const context = useContext(TransactionsContext)

  if (context === undefined)
    throw new Error("Transactions context was used out of its provider.")

  return context
}

export { TransactionsProvider, useTransaction }
