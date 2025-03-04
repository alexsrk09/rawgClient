"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getPublishers, searchPublishersThunk, setCurrentPage } from "../store/slices/gamesSlice"
import Pagination from "../components/Pagination"

const PublishersPage = () => {
  const dispatch = useDispatch()
  const { publishers, loading, error, totalPages, currentPage } = useSelector((state) => state.games)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(getPublishers(currentPage))
  }, [dispatch, currentPage])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm) {
      dispatch(searchPublishersThunk({ searchTerm, page: 1 }))
      dispatch(setCurrentPage(1))
    }
  }

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    window.scrollTo(0, 0)
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

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="list-group">
            {publishers.map((publisher) => (
              <Link
                key={publisher.id}
                to={`/publisher/${publisher.id}`}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                {publisher.name}
                <span className="badge bg-primary rounded-pill">{publisher.games_count} games</span>
              </Link>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

export default PublishersPage

