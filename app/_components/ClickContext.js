"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { loadBudgets, loadCategories, loadThemes } from "../_lib/handler"

const ModalContext = createContext()

function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [isPotModal, setIsPotModal] = useState(false)
  const [deletePot, setDeletePot] = useState(false)

  const [allCategories, setAllCategories] = useState()
  const [themeColors, setThemeColors] = useState()
  const [budgets, setBudgets] = useState()
  const [currentBudget, setCurrentBudget] = useState(null)
  const [currentBudgetForDelete, setCurrentBudgetForDelete] = useState(null)
  const [activeBtnName, setActiveBtnName] = useState(null)
  const [currentPot, setCurrentPot] = useState(null)
  const [editPotById, setEditPotByID] = useState(null)
  const [activePotDelete, setActivePotDelete] = useState(null)

  function handleOpen(budget = null, pot = null) {
    setIsOpen(true)
    setCurrentBudget(budget)
    setEditPotByID(pot)
  }

  function handleClose() {
    setIsOpen(false)
  }

  function handleOpenDelete(budget = null) {
    setOpenDelete(true)
    setCurrentBudgetForDelete(budget)
  }

  function handleCloseDelete() {
    setOpenDelete(false)
  }

  // POT MENU
  function handleOpenPotModal(pot = null, buttonName = null) {
    setIsPotModal(true)
    setCurrentPot(pot)
    setActiveBtnName(buttonName)
  }

  function handleClosePotModal() {
    setIsPotModal(false)
  }

  function handleOpenPotDelete(targetPot = null) {
    setDeletePot(true)
    setActivePotDelete(targetPot)
  }

  function handleClosePotDelete() {
    setDeletePot(false)
  }

  // FETCH CATEGORIES
  useEffect(function () {
    async function getData() {
      const categories = await loadCategories()
      setAllCategories(categories)
    }
    // INVOKE
    getData()
  }, [])

  // FETCH THEME COLORS
  useEffect(function () {
    async function getThemes() {
      const themes = await loadThemes()
      setThemeColors(themes)
    }
    // INVOKE
    getThemes()
  }, [])

  // FETCH BUDGETS
  useEffect(function () {
    // IIFE IN EXPERIMENT
    ;(async function () {
      const budgets = await loadBudgets()
      setBudgets(budgets)
    })()
  }, [])

  return (
    <ModalContext
      value={{
        isOpen,
        handleOpen,
        handleClose,
        allCategories,
        themeColors,
        budgets,
        currentBudget,
        openDelete,
        handleOpenDelete,
        handleCloseDelete,
        currentBudgetForDelete,
        currentPot,
        isPotModal,
        handleOpenPotModal,
        handleClosePotModal,
        activeBtnName,
        deletePot,
        handleOpenPotDelete,
        handleClosePotDelete,
        editPotById,
        activePotDelete,
      }}
    >
      {children}
    </ModalContext>
  )
}

function useModal() {
  const context = useContext(ModalContext)

  if (context === undefined)
    throw new Error("Context was used out of its provider!")

  return context
}

export { ModalProvider, useModal }
