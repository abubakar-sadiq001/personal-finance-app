"use client"

import { formatCurrency } from "@/app/_utils/helpers"
import Empty from "../Empty"
import BoxHeading from "./BoxHeading"
import Image from "next/image"

function Pots({ pots }) {
  const totalSaved = pots
    ?.map((pot) => pot.totalSaved)
    ?.reduce((acc, sum) => acc + sum, 0)

  return (
    <div className="col-span-2 rounded-md bg-secondary-white px-6 py-5 max-[808px]:col-span-4">
      <BoxHeading name="Pots" url="pots" />

      {pots?.length !== 0 ? (
        <div className="mt-3 flex gap-x-4 max-[864px]:flex-col max-[864px]:gap-y-4">
          {/* <div> */}
          <div className="flex w-full items-center rounded-md bg-beige-100 px-5 py-4">
            <div className="mr-3">
              <Image
                src="/icon-pot.svg"
                width={30}
                height={30}
                className="min-w-[20px] max-[1136px]:w-[20px]"
                alt="icon-total-saved"
              />
            </div>
            <div>
              <p className="text-gry-500 text-[12px] text-gray-500">
                Total Saved
              </p>
              <h1 className="text-[22px] font-bold max-[1136px]:text-[17px]">
                {formatCurrency(totalSaved)}
              </h1>
            </div>
          </div>
          {/* </div> */}
          <div className="w-full">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {pots
                ?.filter((pot) => pot)
                .slice(0, 4)
                ?.map((pot) => (
                  <li key={pot.id} className="my-1 flex">
                    <div
                      style={{
                        width: "3px",
                        height: "100%",
                        borderRadius: "60px",
                        backgroundColor: pot.theme,
                      }}
                    ></div>
                    <div
                      style={{
                        paddingLeft: "7px",
                      }}
                    >
                      <p className="text-[12px] text-gray-500">{pot.potName}</p>
                      <h3 className="text-[13px] font-bold text-gray-900">
                        ${pot.totalSaved}
                      </h3>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-4 w-full max-w-[100%] rounded-md bg-beige-100 p-6">
          <Empty resourceName="pots" bg="bg-beige-100" />
        </div>
      )}
    </div>
  )
}

export default Pots
