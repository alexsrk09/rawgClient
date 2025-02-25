"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchTags, searchTags } from "../services/api"
import Pagination from "../components/Pagination"

const TagsPage = () => {
  const [tags, setTags] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadTags = async () => {
      const result = await fetchTags(currentPage)
      setTags(result.results)
      setTotalPages(Math.ceil(result.count / 20))
    }
    loadTags()
  }, [currentPage])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm) {
      const result = await searchTags(searchTerm, 1)
      setTags(result.results)
      setTotalPages(Math.ceil(result.count / 20))
      setCurrentPage(1)
    }
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default TagsPage

