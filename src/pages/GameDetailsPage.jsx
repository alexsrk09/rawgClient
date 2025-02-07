import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchGameDetails } from "../services/api"

const GameDetailsPage = () => {
  const [game, setGame] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const loadGameDetails = async () => {
      const gameDetails = await fetchGameDetails(id)
      setGame(gameDetails)
    }
    loadGameDetails()
  }, [id])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // para guardar favoritos (si se me canta el huevo)
    // por ahora es inutil el button
  }

  if (!game) {
    return <div className="container py-5 text-center">Loading...</div>
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">{game.name}</h1>
      <img
        src={game.background_image || "/placeholder.svg"}
        alt={game.name}
        className="img-fluid mb-4"
        style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
      />
      <button onClick={toggleFavorite} className={`btn mb-4 ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <div className="row">
        <div className="col-md-6">
          <h2 className="h3 mb-3">About</h2>
          <p>{game.description_raw}</p>
        </div>
        <div className="col-md-6">
          <h2 className="h3 mb-3">Details</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Release Date:</strong> {game.released}
            </li>
            <li className="list-group-item">
              <strong>Rating:</strong> {game.rating}/5
            </li>
            <li className="list-group-item">
              <strong>Platforms:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}
            </li>
            <li className="list-group-item">
              <strong>Genres:</strong> {game.genres.map((g) => g.name).join(", ")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GameDetailsPage

