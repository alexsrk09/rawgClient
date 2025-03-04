"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getGames, searchGamesThunk, setCurrentPage } from "../store/slices/gamesSlice"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"
import GameSorter from "../components/GameSorter"

const GamesPage = () => {
  const dispatch = useDispatch()
  const { games, loading, error, totalPages, currentPage, sortCriteria, sortDirection } = useSelector(
    (state) => state.games,
  )
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(getGames(currentPage))
  }, [dispatch, currentPage])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm) {
      dispatch(searchGamesThunk({ searchTerm, page: 1 }))
      dispatch(setCurrentPage(1))
    }
  }

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    window.scrollTo(0, 0)
  }

  // Sort games based on criteria and direction
  const sortedGames = [...games].sort((a, b) => {
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

export default GamesPage

