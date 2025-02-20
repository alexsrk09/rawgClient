import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import GamesPage from "./pages/GamesPage"
import GameDetailsPage from "./pages/GameDetailsPage"
import GamesByTagOrGenrePage from "./pages/GamesByTagOrGenrePage"
import PublisherPage from "./pages/PublisherPage"
import PublishersPage from "./pages/PublishersPage"

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/game/:id" element={<GameDetailsPage />} />
            <Route path="/games/:type/:id" element={<GamesByTagOrGenrePage />} />
            <Route path="/publisher/:id" element={<PublisherPage />} />
            <Route path="/publishers" element={<PublishersPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

