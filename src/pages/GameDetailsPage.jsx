"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchGameDetails } from "../services/api"

/**
 * @function GameDetailsPage
 * @description Componente que muestra los detalles de un juego específico.
 * Permite agregar o quitar el juego de favoritos.
 * @returns {JSX.Element} Componente con los detalles del juego.
 */
const GameDetailsPage = () => {
  const [game, setGame] = useState(null) // Estado para almacenar los detalles del juego
  const [isFavorite, setIsFavorite] = useState(false) // Estado para controlar si el juego es favorito
  const { id } = useParams() // Obtiene el ID del juego de los parámetros de la URL

  useEffect(() => {
    /**
     * @async
     * @function loadGameDetails
     * @description Carga los detalles del juego desde la API y actualiza el estado.
     */
    const loadGameDetails = async () => {
      const gameDetails = await fetchGameDetails(id) // Llama a la API para obtener detalles del juego
      setGame(gameDetails) // Actualiza el estado con los detalles del juego
    }
    loadGameDetails() // Ejecuta la función para cargar los detalles del juego
  }, [id]) // Se ejecuta cuando el ID cambia

  /**
   * @function toggleFavorite
   * @description Cambia el estado de favorito del juego.
   */
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite) // Alterna el estado de favorito
    // Aquí se podría actualizar la información en una base de datos o almacenamiento local
  }

  // Si los detalles del juego aún no se han cargado, muestra un mensaje de carga
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
              <strong>Genres:</strong>
              {game.genres.map((genre, index) => (
                <Link key={genre.id} to={`/games/genre/${genre.id}`} className="badge bg-secondary me-1">
                  {genre.name}
                </Link>
              ))}
            </li>
            <li className="list-group-item">
              <strong>Tags:</strong>
              {game.tags.map((tag, index) => (
                <Link key={tag.id} to={`/games/tag/${tag.id}`} className="badge bg-info me-1">
                  {tag.name}
                </Link>
              ))}
            </li>
            <li className="list-group-item">
              <strong>Publishers:</strong>
              {game.publishers.map((publisher, index) => (
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
