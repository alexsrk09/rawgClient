import { useDispatch, useSelector } from "react-redux"
import { setSortCriteria, setSortDirection } from "../store/slices/gamesSlice"

const GameSorter = () => {
  const dispatch = useDispatch()
  const { sortCriteria, sortDirection } = useSelector((state) => state.games)

  const handleSortCriteriaChange = (e) => {
    dispatch(setSortCriteria(e.target.value))
  }

  const handleSortDirectionChange = (e) => {
    dispatch(setSortDirection(e.target.value))
  }

  return (
    <div className="d-flex align-items-center mb-4">
      <span className="me-2">Sort by:</span>
      <select
        className="form-select me-2"
        value={sortCriteria}
        onChange={handleSortCriteriaChange}
        style={{ width: "auto" }}
      >
        <option value="name">Name</option>
        <option value="released">Release Date</option>
        <option value="rating">Rating</option>
        <option value="added">Popularity</option>
      </select>
      <select
        className="form-select"
        value={sortDirection}
        onChange={handleSortDirectionChange}
        style={{ width: "auto" }}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  )
}

export default GameSorter

