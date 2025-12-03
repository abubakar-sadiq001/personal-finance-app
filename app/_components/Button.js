function Button({ children, onClick, disabled, customStyles, iconSrc }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`transition ${iconSrc ? "flex items-center" : ""} duration-[.2s] hover:bg-gray-500 ${!customStyles ? "rounded-[8px] bg-gray-900 px-5 py-3 text-sm font-semibold text-white" : customStyles}`}
    >
      {children}
    </button>
  )
}

export default Button
