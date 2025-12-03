import Link from "next/link"

function Logo({ isSideBarOpen }) {
  return (
    <Link href="/" className="px-3">
      <img
        src={isSideBarOpen ? "/Logo.svg" : "/logo-small.svg"}
        alt="logo-img"
      />
    </Link>
  )
}

export default Logo
