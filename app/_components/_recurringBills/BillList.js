import { formatCurrency } from "@/app/_utils/helpers"
import { format } from "date-fns"
import Image from "next/image"

function BillList({ recurringTransaction }) {
  const created_at = recurringTransaction.created_at
  //   const dueStatus = getBillStatus(created_at)

  return (
    <div className="w-full">
      <li className="flex items-center border-t border-gray-200 py-4">
        {/*  */}
        <div className="min-w-0 flex-[1.5] items-center px-2">
          <div className="mr-2 flex items-center max-[481px]:hidden">
            <Image
              src={recurringTransaction.avatar}
              width={35}
              height={35}
              className="mr-3 rounded-[50px]"
              alt="bill-avatar"
            />
            <p className="truncate text-[13px] font-bold text-gray-900">
              {recurringTransaction.recipientName}
            </p>
          </div>

          {/* FOR MOBILE VIEW */}
          <div className="flex items-center min-[481px]:hidden">
            <div>
              <Image
                src={recurringTransaction.avatar}
                width={35}
                height={35}
                className="mr-3 rounded-[50px]"
                alt="bill-avatar"
              />
            </div>

            <div>
              <p className="truncate text-[13px] font-bold text-gray-900">
                {recurringTransaction.recipientName}
              </p>

              <p className="flex items-center text-[13px] text-gray-500 max-[481px]:text-[13px]">
                Monthly - {format(new Date(created_at), "Lo")}
                <span className="ml-3">
                  <img src="/icon-bill-paid.svg" />
                </span>
              </p>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="min-w-0 flex-[1.5] px-2 max-[600px]:flex-[1.3] max-[481px]:hidden">
          <p className="flex items-center text-[13px] text-gray-500">
            Monthly - {format(new Date(created_at), "Lo")}
            <span className="ml-3">
              <img src="/icon-bill-paid.svg" />
            </span>
          </p>
        </div>

        {/*  */}
        <div className="min-w-0 flex-[.3] px-2 text-right max-[600px]:flex-[.4]">
          <p className="text-[13px] font-bold text-gray-900">
            {recurringTransaction.amount >= 1000
              ? `$${(recurringTransaction.amount / 1000).toFixed(1)}k`
              : formatCurrency(recurringTransaction.amount)}
          </p>
        </div>
      </li>
    </div>
  )
}

export default BillList
