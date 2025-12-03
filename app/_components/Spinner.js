import { Loader } from "rsuite"

function Spinner() {
  return (
    <div className="my-[55px] flex items-center justify-center">
      <Loader size="md" content="Loading transactions..." vertical />
    </div>
  )
}

export default Spinner
