import { Loader } from "rsuite"

export default function Loading() {
  return (
    <div className="mt-[200px] flex flex-col items-center justify-center">
      <Loader size="lg" />
      <p className="text-primary-200 text-xl">Just a second...</p>
    </div>
  )
}
