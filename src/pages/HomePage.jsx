"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getPopularGames } from "../store/slices/gamesSlice"
import GameCarousel from "../components/GameCarousel"

const HomePage = () => {
  const dispatch = useDispatch()
  const { popularGames, loading } = useSelector((state) => state.games)

  useEffect(() => {
    dispatch(getPopularGames())
  }, [dispatch])

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Welcome to GameExplorer</h1>
      {loading ? <div className="text-center">Loading...</div> : <GameCarousel games={popularGames} />}
      <section className="mt-5">
        <h2 className="h3 mb-3">Explore the World of Games</h2>
        <p className="lead mb-4">
          Discover new and exciting games, search for your favorites, and explore detailed information about each title.
        </p>
        <div className="d-flex gap-3">
          <Link to="/games" className="btn btn-primary btn-lg">
            Start Exploring
          </Link>
          <Link to="/events" className="btn btn-outline-primary btn-lg">
            Check Out Events
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage

