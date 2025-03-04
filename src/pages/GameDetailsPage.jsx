"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getGameDetails } from "../store/slices/gamesSlice"
import { toggleFavorite } from "../store/slices/userSlice"

const GameDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { gameDetails, loading, error } = useSelector((state) => state.games)
  const { favorites } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getGameDetails(id))
  }, [dispatch, id])

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(Number.parseInt(id)))
  }

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>
  }

  if (error) {
    return <div className="container py-5 text-center">Error: {error}</div>
  }

  if (!gameDetails) {
    return <div className="container py-5 text-center">Game not found</div>
  }

  const isFavorite = favorites.includes(Number.parseInt(id))

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">{gameDetails.name}</h1>
      <img
        src={gameDetails.background_image || "/placeholder.svg?height=400&width=800"}
        alt={gameDetails.name}
        className="img-fluid mb-4"
        style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
      />
      <button
        onClick={handleToggleFavorite}
        className={`btn mb-4 ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <div className="row">
        <div className="col-md-6">
          <h2 className="h3 mb-3">About</h2>
          <p>{gameDetails.description_raw}</p>
        </div>
        <div className="col-md-6">
          <h2 className="h3 mb-3">Details</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Release Date:</strong> {gameDetails.released}
            </li>
            <li className="list-group-item">
              <strong>Rating:</strong> {gameDetails.rating}/5
            </li>
            <li className="list-group-item">
              <strong>Platforms:</strong> {gameDetails.platforms.map((p) => p.platform.name).join(", ")}
            </li>
            <li className="list-group-item">
              <strong>Genres:</strong>
              {gameDetails.genres.map((genre, index) => (
                <Link key={genre.id} to={`/games/genre/${genre.id}`} className="badge bg-secondary me-1">
                  {genre.name}
                </Link>
              ))}
            </li>
            <li className="list-group-item">
              <strong>Tags:</strong>
              {gameDetails.tags.map((tag, index) => (
                <Link key={tag.id} to={`/games/tag/${tag.id}`} className="badge bg-info me-1">
                  {tag.name}
                </Link>
              ))}
            </li>
            <li className="list-group-item">
              <strong>Publishers:</strong>
              {gameDetails.publishers.map((publisher, index) => (
                <Link key={publisher.id} to={`/publisher/${publisher.id}`} className="badge bg-primary me-1">
                  {publisher.name}
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GameDetailsPage

