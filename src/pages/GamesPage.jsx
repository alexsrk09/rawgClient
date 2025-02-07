import { useState, useEffect } from "react"
import { fetchPopularGames, searchGames } from "../services/api"
import GameCard from "../components/GameCard"

const GamesPage = () => {
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadGames = async () => {
      const fetchedGames = await fetchPopularGames(50)
      setGames(fetchedGames)
    }
    loadGames()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm) {
      const searchResults = await searchGames(searchTerm)
      setGames(searchResults)
    }
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Explore Games</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for games..."
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {games.map((game) => (
          <div key={game.id} className="col">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GamesPage

