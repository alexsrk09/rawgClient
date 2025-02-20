"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchPublishers, searchPublishers } from "../services/api"
import Pagination from "../components/Pagination"

const PublishersPage = () => {
  const [publishers, setPublishers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadPublishers = async () => {
      const result = await fetchPublishers(currentPage)
      setPublishers(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadPublishers()
  }, [currentPage])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm) {
      const result = await searchPublishers(searchTerm, 1)
      setPublishers(result.results)
      setTotalPages(Math.ceil(result.count / 20))
      setCurrentPage(1)
    }
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Explore Publishers</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for publishers..."
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <div className="list-group">
        {publishers.map((publisher) => (
          <Link key={publisher.id} to={`/publisher/${publisher.id}`} className="list-group-item list-group-item-action">
            {publisher.name}
          </Link>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default PublishersPage

