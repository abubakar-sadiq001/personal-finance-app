import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

/*import { NextResponse } from "next/server"

export function middleware(request) {
  console.log(request)

  return NextResponse.redirect(new URL("/signin", request.url))
}
  */

// middleware.js

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const url = new URL("/signin", request.url)
    url.searchParams.set("callbackUrl", request.url)
    return Response.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/transactions", "/budgets", "/pots", "/recurringBills"],
}
