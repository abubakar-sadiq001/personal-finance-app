"use client"

function MenuBtn({ setShowMenu }) {
  return (
    <div>
      <button onClick={() => setShowMenu((menu) => !menu)}>
        <img src="./icon-ellipsis.svg" />
      </button>
    </div>
  )
}

export default MenuBtn
