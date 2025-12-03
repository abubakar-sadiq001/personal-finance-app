import { sortOptions } from "../data/appData"
import SortBy from "./SortBy"

function MobileSort() {
  return (
    <div className="mb-3 min-[925px]:hidden">
      <SortBy optionalWidth="100%" label={false} options={sortOptions} />
    </div>
  )
}

export default MobileSort
