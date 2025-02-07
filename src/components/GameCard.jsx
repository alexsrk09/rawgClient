import { Link } from "react-router-dom"

const GameCard = ({ game }) => {
  return (
    <div className="card h-100">
      <img
        src={game.background_image || "/placeholder.svg"}
        className="card-img-top"
        alt={game.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
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

