"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
// import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { createServerClient } from "../supabaseServer"

function db() {
  return createServerClient()
}

// DELETE POT
export async function handleDeletePot(potId) {
  const session = await auth()
  const user_id = session.user.id

  const supabase = db()

  const { error: deletError } = await supabase
    .from("pots")
    .delete()
    .eq("id", potId)
    .eq("user_id", user_id)

  if (deletError) throw new Error(deletError.message)

  revalidatePath("/pots")
}
