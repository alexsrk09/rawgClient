"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchPublisherDetails, fetchPublisherGames } from "../services/api"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"

const PublisherDetailsPage = () => {
  const [publisher, setPublisher] = useState(null)
  const [games, setGames] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const loadPublisherDetails = async () => {
      const details = await fetchPublisherDetails(id)
      setPublisher(details)
    }
    loadPublisherDetails()
  }, [id])

  useEffect(() => {
    const loadPublisherGames = async () => {
      const result = await fetchPublisherGames(id, currentPage)
      setGames(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadPublisherGames()
  }, [id, currentPage])

  if (!publisher) {
    return <div className="container py-5 text-center">Loading...</div>
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">{publisher.name}</h1>
      {publisher.image_background && (
        <img
          src={publisher.image_background || "/placeholder.svg"}
          alt={publisher.name}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
        />
      )}
      <p className="lead mb-4">{publisher.description_raw || "No description available."}</p>
      <h2 className="h3 mb-3">Games by {publisher.name}</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
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

export default PublisherDetailsPage

