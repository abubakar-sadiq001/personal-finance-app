"use client"

function Select({ options, value, onChange, disabled, optionalWidth }) {
  return (
    <select
      value={value || ""}
      onChange={onChange}
      className={`${!optionalWidth && "ml-2"} cursor-pointer rounded-md border border-gray-500 px-2 py-3 text-sm outline-none`}
      style={{
        width: optionalWidth,
      }}
      disabled={disabled}
    >
      {options?.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
