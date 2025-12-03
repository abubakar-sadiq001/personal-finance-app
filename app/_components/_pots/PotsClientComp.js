"use client"

import DeletePotModal from "../_pots/DeletePotModal"
import Box from "../Box"
import { useModal } from "../ClickContext"
import AddAndWithdrawForm from "./AddAndWithdrawForm"
import CreatePotForm from "./CreatePotForm"

function PotsClientCompt({ children }) {
  const {
    isOpen,
    currentPot,
    isPotModal,
    activeBtnName,
    deletePot,
    handleClosePotDelete,
    editPotById,
    activePotDelete,
  } = useModal()

  return (
    <>
      {isPotModal && (
        <Box
          resourceName={`${activeBtnName === "addMoney" ? "Add to" : "Withdraw from"} '${currentPot.potName}'`}
          IDname="addMoneyOverlay"
        >
          <AddAndWithdrawForm
            currentPot={currentPot}
            activeBtnName={activeBtnName}
          />
        </Box>
      )}

      {/* Pot Form */}
      {isOpen && (
        <Box
          resourceName={`${editPotById?.id ? "Eit Pot" : "Add New Pot"}`}
          IDname="createPotForm"
        >
          <CreatePotForm />
        </Box>
      )}
      {/*  */}
      {deletePot && (
        <Box
          resourceName={`Delete '${activePotDelete.id && activePotDelete.potName}' ?`}
          IDname="deletePotOverlay"
        >
          <DeletePotModal onCloseModal={handleClosePotDelete} />
        </Box>
      )}
      {children}
    </>
  )
}

export default PotsClientCompt
