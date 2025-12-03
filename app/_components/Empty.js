function Empty({ resourceName, bg }) {
  return (
    <div
      className={`mx-auto w-full rounded-lg text-center ${bg} p-6 text-gray-500`}
    >
      No {resourceName} found.
    </div>
  )
}

export default Empty
