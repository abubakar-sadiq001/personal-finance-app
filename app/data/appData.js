// FILTER OPTIONS
export const filterOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "general",
    label: "General",
  },
  {
    value: "bills",
    label: "Bills",
  },
  {
    value: "dinningout",
    label: "Dinning Out",
  },
  {
    value: "transportation",
    label: "Transportation",
  },
  {
    value: "personalcare",
    label: "Personal Care",
  },
  {
    value: "lifestyle",
    label: "Lifestyle",
  },
  {
    value: "shopping",
    label: "Shopping",
  },
]

// SORT OPTIONS
export const sortOptions = [
  {
    value: "created_at-desc",
    label: "Latest",
  },
  {
    value: "created_at-asc",
    label: "Oldest",
  },
  {
    value: "recipientName-asc",
    label: "Name (A-Z)",
  },
  {
    value: "recipientName-desc",
    label: "Name (Z-A)",
  },
  {
    value: "amount-desc",
    label: "Amount (Highest)",
  },
  {
    value: "amount-asc",
    label: "Amount (Lowest)",
  },
]

// NAv LINKS
export const navLinks = [
  {
    name: "Home",
    href: "/",
    iconActive: "/icon-nav-overview-active.svg",
    iconInActive: "/icon-nav-overview.svg",
  },
  {
    name: "Transactions",
    href: "/transactions",
    iconActive: "/icon-nav-transactions-active.svg",
    iconInActive: "/icon-nav-transactions.svg",
  },
  {
    name: "Budgets",
    href: "/budgets",
    iconActive: "/icon-nav-budgets-active.svg",
    iconInActive: "/icon-nav-budgets.svg",
  },
  {
    name: "Pots",
    href: "/pots",
    iconActive: "/icon-nav-pots-active.svg",
    iconInActive: "/icon-nav-pots.svg",
  },
  {
    name: "Recurring Bills",
    href: "/recurringBills",
    iconActive: "/icon-nav-recurring-bills-active.svg",
    iconInActive: "/icon-nav-recurring-bills.svg",
  },
]
