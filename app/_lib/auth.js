import Credentials from "next-auth/providers/credentials"

import { verifyPassword } from "./bcrypt"
import { findUser } from "./data-services"

class InvalidLoginError extends Error {
  constructor() {
    super("Invalid indentifier or password")
    this.name = "InvalidLoginError"
    this.code = "credentials"
  }
}

export const authConfig = {
  trustHost: true,
  basePath: "/api/auth",
  url: process.env.NEXTAUTH_URL,

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new InvalidLoginError()

        const user = await findUser(credentials?.email)
        if (!user) throw new InvalidLoginError()

        const validatePassword = await verifyPassword(
          credentials.password,
          user.password_hash
        )
        if (!validatePassword) throw new InvalidLoginError()

        // ← MUST return an object with `id` as string (and whatever else you want in session)
        return {
          id: user.id.toString(), // ← very important: string!
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user
    },

    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
}
