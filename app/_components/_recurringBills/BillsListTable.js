function BillsListTable() {
  return (
    // <div className="flex text-[13px] font-bold text-secondary-navy">
    //   <p> Bill Title</p>
    //   <p>Due Date</p>
    //   <p>Amount</p>
    // </div>

    <div className="w-full text-[12px] max-[511px]:hidden">
      <div className="flex items-center py-3 font-bold text-secondary-navy">
        <div className="min-w-0 flex-[1.5] px-2 text-[13px]">
          <p>Bill Title</p>
        </div>

        <div className="min-w-0 flex-[1.2] px-2 text-[13px]">
          <p>Due Date Date</p>
        </div>
        <div className="min-w-0 flex-[0.5] px-2 text-right text-[13px]">
          <p>Amount</p>
        </div>
      </div>
    </div>
  )
}

export default BillsListTable
