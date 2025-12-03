import Image from "next/image"
import { navLinks } from "../data/appData"
import Link from "next/link"
import { usePathname } from "next/navigation"

function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 z-50 flex h-[80px] w-full rounded-t-md bg-black px-3 pt-2 min-[1000px]:hidden">
      <div className="flex h-full w-full">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`inline-flex h-full w-full flex-1 flex-col items-center justify-center gap-1 ${
              pathname === link.href
                ? "h-[70px] rounded-t-md border-b-4 border-secondary-green bg-gray-100 py-2"
                : ""
            }`}
          >
            <span>
              <Image
                src={
                  pathname === link.href ? link.iconActive : link.iconInActive
                }
                alt={link.name}
                width={15}
                height={15}
                className="min-[610px]:mb-2" // Added margin bottom to separate image from text
              />
            </span>

            <p
              className={`text-[11px] font-semibold max-[610px]:hidden ${pathname === link.href ? "text-gray-900" : "text-secondary-white"}`}
            >
              {link.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
