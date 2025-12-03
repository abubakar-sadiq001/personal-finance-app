function TransactionsTable() {
  return (
    <div className="w-full text-[12px] max-[631px]:hidden">
      <div className="flex items-center py-3 font-bold text-secondary-navy">
        <div className="min-w-0 flex-[1.5] px-2 text-[13px]">
          <p>Recipient / Sender</p>
        </div>
        <div className="min-w-0 flex-1 px-2 text-[13px]">
          <p>Category</p>
        </div>
        <div className="min-w-0 flex-[1.2] px-2 text-[13px]">
          <p>Transaction Date</p>
        </div>
        <div className="min-w-0 flex-[0.5] px-2 text-right text-[13px]">
          <p>Amount</p>
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable
