import { isFuture, isPast, isToday } from "date-fns"

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  )

export const MAX_NAME_LENGTH = 30

// export function getBillStatus(date) {
//   const today = new Date()
//   const billDate = new Date(date)

//   // get the recurring day (e.g. 11th of each month)
//   const recurringDay = billDate.getDate()

//   // create this month's due date
//   const currentDueDate = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     recurringDay
//   )

//   if (isToday(currentDueDate)) return "due"
//   if (isPast(currentDueDate)) return "paid"
//   if (isFuture(currentDueDate)) return "upcoming"
// }

export const BillsSummary = [
  {
    name: "Paid Bills",
    theme: "#277c78",
  },
  {
    name: "Total Upcoming",
    theme: "#f2cdac",
  },
  {
    name: "Due Soon",
    theme: "#82c9d7",
  },
]
