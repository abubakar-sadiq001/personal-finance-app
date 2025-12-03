import { CustomProvider } from "rsuite"
import "./_styles/globals.css"
import "rsuite/dist/rsuite-no-reset.min.css"
import { ModalProvider } from "./_components/ClickContext"
import ToasterProvider from "./_components/ToasterProvider"
import { SessionProvider } from "next-auth/react"

// app/layout.tsx
export const metadata = {
  title: "Personal finance app",
}

export function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-beige-100">
        <SessionProvider>
          <CustomProvider>
            <ModalProvider>
              <main>{children}</main>
            </ModalProvider>
            <ToasterProvider />
          </CustomProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
