import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/index"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import GamesPage from "./pages/GamesPage"
import GameDetailsPage from "./pages/GameDetailsPage"
import GamesByTagOrGenrePage from "./pages/GamesByTagOrGenrePage"
import PublishersPage from "./pages/PublishersPage"
import PublisherDetailsPage from "./pages/PublisherDetailsPage"
import TagsPage from "./pages/TagsPage"
import EventsPage from "./pages/EventsPage"
import EventDetailsPage from "./pages/EventDetailsPage"
import EventRegistrationPage from "./pages/EventRegistrationPage"
import FavoritesPage from "./pages/FavoritesPage"
import MyEventsPage from "./pages/MyEventsPage"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/game/:id" element={<GameDetailsPage />} />
              <Route path="/games/:type/:id" element={<GamesByTagOrGenrePage />} />
              <Route path="/publishers" element={<PublishersPage />} />
              <Route path="/publisher/:id" element={<PublisherDetailsPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/event/:id" element={<EventDetailsPage />} />
              <Route path="/event-registration/:id" element={<EventRegistrationPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/my-events" element={<MyEventsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App

