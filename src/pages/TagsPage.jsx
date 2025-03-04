"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTags, searchTagsThunk, setCurrentPage } from "../store/slices/gamesSlice"
import Pagination from "../components/Pagination"

const TagsPage = () => {
  const dispatch = useDispatch()
  const { tags, loading, error, totalPages, currentPage } = useSelector((state) => state.games)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(getTags(currentPage))
  }, [dispatch, currentPage])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm) {
      dispatch(searchTagsThunk({ searchTerm, page: 1 }))
      dispatch(setCurrentPage(1))
    }
  }

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    window.scrollTo(0, 0)
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Explore Tags</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for tags..."
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
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {tags.map((tag) => (
              <div key={tag.id} className="col">
                <Link to={`/games/tag/${tag.id}`} className="text-decoration-none">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{tag.name}</h5>
                      <p className="card-text text-muted">Games count: {tag.games_count}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

export default TagsPage

