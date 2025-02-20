"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchGamesByTagOrGenre } from "../services/api"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"

const GamesByTagOrGenrePage = () => {
  const [games, setGames] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { type, id } = useParams()

  useEffect(() => {
    const loadGames = async () => {
      const result = await fetchGamesByTagOrGenre(type, id, currentPage)
      setGames(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadGames()
  }, [type, id, currentPage])

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Games by {type === "tag" ? "Tag" : "Genre"}</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {games.map((game) => (
          <div key={game.id} className="col">
            <GameCard game={game} />
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default GamesByTagOrGenrePage

