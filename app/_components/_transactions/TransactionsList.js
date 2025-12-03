import Image from "next/image"
import { format } from "date-fns"
import { formatCurrency } from "../../_utils/helpers"

function TransactionList({ transaction, query, displayedTransaction }) {
  const { created_at, recipientName, category, amount, avatar } = transaction
  const breakPoint = 630

  // const xy = displayedTransaction?.map((el) =>
  //   el.recipientName.toLowerCase().includes(query.toLowerCase())
  // )
  // console.log(xy)
  // const regex = new RegExp(`(${query})`, "gi")
  // const parts = recipientName.split(regex)

  return (
    // <li
    //   // key={key}
    //   className="border-b-10 grid grid-cols-[350px_190px_310px_60px] items-center border-t-[1px] border-gray-200 py-5 hover:bg-gray-50"
    // >
    //   <span className="flex items-center text-[12px] text-sm font-bold text-gray-900">
    //     <div>
    //       <img
    //         src={avatar}
    //         width={32}
    //         height={32}
    //         alt="name"
    //         className="rounded-1xl mr-3 rounded-2xl"
    //       />
    //     </div>

    //     <p>{recipientName}</p>
    //   </span>
    //   <span className="text-[12px] text-gray-500">{category}</span>
    //   <span className="text-[12px] text-gray-500">
    //     {format(new Date(created_at), "dd MMM yyyy")}
    //   </span>
    //   <span
    //     className={`text-[11.5px] text-sm font-bold ${amount >= 1 ? "text-secondary-green" : "text-gray-900"}`}
    //   >
    //     {/* {amount > 999 ? `${amount.toFixed(2)}k` : formatCurrency(amount)} */}
    //     {amount >= 1000
    //       ? `$${(amount / 1000).toFixed(1)}k`
    //       : formatCurrency(amount)}
    //   </span>
    // </li>

    <>
      <li className="flex items-center border-t border-gray-200 py-5 hover:bg-gray-50 max-[630px]:hidden">
        {/* Recipient/Sender */}
        <div className="min-w-0 flex-[1.5] px-2">
          <span className="flex items-center text-sm font-bold text-gray-900">
            <Image
              src={avatar}
              width={32}
              height={32}
              alt="name"
              className="mr-3 rounded-2xl"
            />
            <p className="truncate text-[12px]">{recipientName}</p>
          </span>
        </div>

        {/* Category */}
        <div className="min-w-0 flex-1 px-2">
          <span className="block truncate text-[12px] text-gray-500">
            {category}
          </span>
        </div>

        {/* Date */}
        <div className="min-w-0 flex-[1.2] px-2">
          <span className="text-[12px] text-gray-500">
            {format(new Date(created_at), "dd MMM yyyy")}
          </span>
        </div>

        {/* Amount */}
        <div className="min-w-0 flex-[0.5] px-2 text-right">
          <span
            className={`text-[11.5px] font-bold ${
              amount >= 1 ? "text-secondary-green" : "text-gray-900"
            }`}
          >
            {amount >= 1000
              ? `$${(amount / 1000).toFixed(1)}k`
              : formatCurrency(amount)}
          </span>
        </div>
      </li>

      {/* FOR MOBILE */}

      <li className="flex items-center justify-between gap-x-4 px-4 py-3 min-[631px]:hidden">
        <div className="flex items-center">
          <div>
            <Image
              src={avatar}
              width={32}
              height={32}
              alt="name"
              className="mr-3 rounded-2xl"
            />
          </div>
          <div className="min-w-0">
            {" "}
            <p className="truncate text-[13px] font-bold text-gray-900">
              {recipientName}
            </p>
            <p className="truncate text-[12px] text-gray-500">{category}</p>
          </div>
        </div>

        <div>
          <p className="text-[12px] font-bold text-gray-900">
            {amount >= 1000
              ? `$${(amount / 1000).toFixed(1)}k`
              : formatCurrency(amount)}
          </p>
          <p className="text-[12px] text-gray-500">
            {format(new Date(created_at), "dd MMM yyyy")}
          </p>
        </div>
      </li>
    </>
  )
}

export default TransactionList
