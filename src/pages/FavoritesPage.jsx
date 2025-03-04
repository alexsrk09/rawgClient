"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchGameDetails } from "../services/api"
import GameCard from "../components/GameCard"

const FavoritesPage = () => {
  const { favorites } = useSelector((state) => state.user)
  const [favoriteGames, setFavoriteGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavoriteGames = async () => {
      setLoading(true)
      try {
        const gamesPromises = favorites.map((id) => fetchGameDetails(id))
        const games = await Promise.all(gamesPromises)
        setFavoriteGames(games)
      } catch (error) {
        console.error("Error loading favorite games:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFavoriteGames()
  }, [favorites])

  if (loading) {
    return <div className="container py-5 text-center">Loading your favorites...</div>
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">My Favorite Games</h1>
      {favoriteGames.length === 0 ? (
        <p className="lead">You haven't added any games to your favorites yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {favoriteGames.map((game) => (
            <div key={game.id} className="col">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage

