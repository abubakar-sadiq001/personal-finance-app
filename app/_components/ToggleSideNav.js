import Image from "next/image"

function ToggleSideNav({ onOpen, isSideBarOpen }) {
  return (
    <button
      onClick={() => onOpen((open) => !open)}
      className="absolute bottom-7 flex items-center px-7 hover:text-secondary-white"
    >
      {!isSideBarOpen ? (
        <span>
          <Image
            width={20}
            height={20}
            alt="close icon"
            src="/icon-minimize-menu.svg"
            className={`mr-5 transform transition-transform duration-300 ${
              isSideBarOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </span>
      ) : (
        <>
          <span>
            <Image
              width={20}
              height={20}
              alt="close icon"
              src="/icon-minimize-menu.svg"
              className={`mr-5 transform transition-transform duration-300 ${
                isSideBarOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </span>
          <p className="text-md font-bold text-gray-300">Minimize Menu</p>
        </>
      )}
    </button>
  )
}

export default ToggleSideNav
