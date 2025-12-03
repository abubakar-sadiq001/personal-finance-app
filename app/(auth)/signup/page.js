import AuthBg from "@/app/_components/AuthBg"
import SigninSignupMobileNav from "@/app/_components/Signin-SignupMobileNav"
import SignupForm from "@/app/_components/SignupForm"

function page() {
  return (
    <div className="flex w-full items-center justify-start gap-x-60 max-[1497px]:gap-x-20 max-[1200px]:h-screen max-[1200px]:justify-center max-[960px]:gap-x-10 max-[700px]:gap-x-0">
      <AuthBg />

      <SigninSignupMobileNav />

      <SignupForm />
    </div>
  )
}

export default page
