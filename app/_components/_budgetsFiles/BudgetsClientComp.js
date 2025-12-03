"use client"

import Box from "../Box"
import { useModal } from "../ClickContext"
import CreateBudgetForm from "./CreateBudgetForm"
import DeleteBudgetModal from "./DeleteBudgetModal"

function BudgetsClientComp({ children, budgets }) {
  const {
    isOpen,
    handleClose,
    currentBudget,
    currentBudgetForDelete,
    openDelete,
    handleCloseDelete,
  } = useModal()

  // console.log(budgets)

  return (
    <>
      {isOpen && (
        <Box resourceName="Budget" IDname="budgetOverlay">
          <CreateBudgetForm
            onCloseModal={handleClose}
            currentBudget={currentBudget}
            budgets={budgets}
          />
        </Box>
      )}
      {openDelete && (
        <Box
          resourceName={`Delete ${currentBudgetForDelete?.category}?`}
          IDname="deleteOverlay"
        >
          <DeleteBudgetModal
            onCloseModal={handleCloseDelete}
            budgetId={currentBudgetForDelete?.id}
          />
        </Box>
      )}
      {children}
    </>
  )
}

export default BudgetsClientComp
