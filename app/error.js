"use client"

export default function Error({ error, reset }) {
  function handleClick() {
    reset
    window.location.reload()
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="bg-accent-500 text-primary-800 inline-block rounded-md bg-gray-900 px-6 py-3 text-sm text-white hover:bg-gray-500"
        onClick={handleClick}
      >
        Try again
      </button>
    </main>
  )
}
