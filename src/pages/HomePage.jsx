import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchPopularGames } from "../services/api"
import GameCarousel from "../components/GameCarousel"

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([])

  useEffect(() => {
    const loadPopularGames = async () => {
      const games = await fetchPopularGames(5)
      setPopularGames(games)
    }
    loadPopularGames()
  }, [])

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Welcome to GameExplorer</h1>
      <GameCarousel games={popularGames} />
      <section className="mt-5">
        <h2 className="h3 mb-3">Explore the World of Games</h2>
        <p className="lead mb-4">
          Discover new and exciting games, search for your favorites, and explore detailed information about each title.
        </p>
        <Link to="/games" className="btn btn-primary btn-lg">
          Start Exploring
        </Link>
      </section>
    </div>
  )
}

export default HomePage

