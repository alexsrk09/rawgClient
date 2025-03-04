"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getPublisherDetails, getPublisherGames, setCurrentPage } from "../store/slices/gamesSlice"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"
import GameSorter from "../components/GameSorter"

const PublisherDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { publisherDetails, publisherGames, loading, error, totalPages, currentPage, sortCriteria, sortDirection } =
    useSelector((state) => state.games)

  useEffect(() => {
    dispatch(getPublisherDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getPublisherGames({ id, page: currentPage }))
  }, [dispatch, id, currentPage])

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    window.scrollTo(0, 0)
  }

  // Sort games based on criteria and direction
  const sortedGames = [...(publisherGames || [])].sort((a, b) => {
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

  if (loading || !publisherDetails) {
    return <div className="container py-5 text-center">Loading...</div>
  }

  if (error) {
    return <div className="container py-5 text-center">Error: {error}</div>
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">{publisherDetails.name}</h1>
      {publisherDetails.image_background && (
        <img
          src={publisherDetails.image_background || "/placeholder.svg?height=300&width=800"}
          alt={publisherDetails.name}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
        />
      )}
      <p className="lead mb-4">{publisherDetails.description_raw || "No description available."}</p>
      <h2 className="h3 mb-3">Games by {publisherDetails.name}</h2>

      <GameSorter />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
        {sortedGames.map((game) => (
          <div key={game.id} className="col">
            <GameCard game={game} />
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

export default PublisherDetailsPage

