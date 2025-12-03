import { formatCurrency } from "@/app/_utils/helpers"

function TotalBills({ totalBills }) {
  return (
    <div className="rounded-lg bg-gray-900 p-6 text-secondary-white max-[1237px]:h-full max-[1237px]:w-[50%] max-[588px]:w-full max-[430px]:flex max-[430px]:items-center max-[430px]:gap-x-4">
      <div className="mb-7 mt-3 max-[430px]:m-0">
        <img src="./icon-recurring-bills.svg" />
      </div>

      <div>
        <p className="mb-1 text-[14px]">Total Bills</p>
        <h1 className="text-[30px] font-bold">{formatCurrency(totalBills)}</h1>
      </div>
    </div>
  )
}

export default TotalBills
