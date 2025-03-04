import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toggleFavorite } from "../store/slices/userSlice"

const GameCard = ({ game }) => {
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.user)
  const isFavorite = favorites.includes(game.id)

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(game.id))
  }

  return (
    <div className="card h-100">
      <div className="position-relative">
        <img
          src={game.background_image || "/placeholder.svg?height=200&width=400"}
          className="card-img-top"
          alt={game.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <button
          onClick={handleToggleFavorite}
          className={`btn position-absolute top-0 end-0 m-2 ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
          style={{ zIndex: 1 }}
        >
          <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>
      <div className="card-body">
        <h5 className="card-title">{game.name}</h5>
        <p className="card-text">Rating: {game.rating}/5</p>
        <Link to={`/game/${game.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default GameCard

