import { auth } from "@/app/api/auth/[...nextauth]/route"
import PotsClientCompt from "../../_components/_pots/PotsClientComp"
import PotsList from "../../_components/_pots/PotsList"
import Header from "../../_components/Header"
import Heading from "../../_components/Heading"
import { getPots } from "../../_lib/data-services"
import { redirect } from "next/navigation"

async function Page() {
  const session = await auth()

  const pots = await getPots()
  const potsLength = pots.length

  if (!session) redirect("/signin")

  return (
    <div className="mb-[150px] max-[800px]:mb-[200px]">
      <Header>
        <Heading
          headingName={`Pots (${potsLength || 0})`}
          buttonName="&#43; New Pot"
        />
      </Header>

      <div className="mt-[30px]">
        <PotsClientCompt>
          <PotsList pots={pots} />
        </PotsClientCompt>
      </div>
    </div>
  )
}

export default Page
