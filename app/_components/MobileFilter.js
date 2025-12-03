import { filterOptions } from "../data/appData"
import FilterBy from "./FilterBy"

function MobileFilter() {
  return (
    <div className="mb-3 min-[925px]:hidden">
      <FilterBy optionalWidth="100%" label={false} options={filterOptions} />
    </div>
  )
}

export default MobileFilter
