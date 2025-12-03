// import { handlers } from "../../auth"

// export const { GET, POST } = handlers

import NextAuth from "next-auth"
import { authConfig } from "../../../_lib/auth"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)
