"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getGamesByTagOrGenre, setCurrentPage } from "../store/slices/gamesSlice"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"
import GameSorter from "../components/GameSorter"

const GamesByTagOrGenrePage = () => {
  const dispatch = useDispatch()
  const { type, id } = useParams()
  const { gamesByTagOrGenre, loading, error, totalPages, currentPage, sortCriteria, sortDirection } = useSelector(
    (state) => state.games,
  )

  useEffect(() => {
    dispatch(getGamesByTagOrGenre({ type, id, page: currentPage }))
  }, [dispatch, type, id, currentPage])

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    window.scrollTo(0, 0)
  }

  // Sort games based on criteria and direction
  const sortedGames = [...gamesByTagOrGenre].sort((a, b) => {
    let valueA, valueB

    // Get the values to compare based on the sort criteria
    switch (sortCriteria) {
      case "name":
        valueA = a.name.toLowerCase()
        valueB = b.name.toLowerCase()
        break
      case "released":
        valueA = new Date(a.released || "1900-01-01")
        valueB = new Date(b.released || "1900-01-01")
        break
      case "rating":
        valueA = a.rating || 0
        valueB = b.rating || 0
        break
      case "added":
        valueA = a.added || 0
        valueB = b.added || 0
        break
      default:
        valueA = a.name.toLowerCase()
        valueB = b.name.toLowerCase()
    }

    // Compare the values based on the sort direction
    if (sortDirection === "asc") {
      if (valueA < valueB) return -1
      if (valueA > valueB) return 1
      return 0
    } else {
      if (valueA > valueB) return -1
      if (valueA < valueB) return 1
      return 0
    }
  })

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Games by {type === "tag" ? "Tag" : "Genre"}</h1>

      <GameSorter />

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {sortedGames.map((game) => (
              <div key={game.id} className="col">
                <GameCard game={game} />
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

export default GamesByTagOrGenrePage

