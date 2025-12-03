export function ZodErrors({ error }) {
  if (!error) return null

  return error.map((err, index) => (
    <div key={index} className="mt-1 py-2 text-xs italic text-pink-500">
      {err}
    </div>
  ))
}
