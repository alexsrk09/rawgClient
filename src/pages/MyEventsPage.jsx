"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getEvents } from "../store/slices/eventsSlice"
import { toggleEventRegistration } from "../store/slices/userSlice"

const MyEventsPage = () => {
  const dispatch = useDispatch()
  const { events, loading } = useSelector((state) => state.events)
  const { registeredEvents } = useSelector((state) => state.user)
  const [myEvents, setMyEvents] = useState([])

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  useEffect(() => {
    if (events.length > 0) {
      const filteredEvents = events.filter((event) => registeredEvents.includes(event.id))
      setMyEvents(filteredEvents)
    }
  }, [events, registeredEvents])

  const handleCancelRegistration = (eventId) => {
    dispatch(toggleEventRegistration(eventId))
  }

  if (loading) {
    return <div className="container py-5 text-center">Loading your events...</div>
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">My Events</h1>
      {myEvents.length === 0 ? (
        <div>
          <p className="lead">You haven't registered for any events yet.</p>
          <Link to="/events" className="btn btn-primary">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {myEvents.map((event) => (
            <div key={event.id} className="col">
              <div className="card h-100">
                <img
                  src={event.image || "/placeholder.svg?height=200&width=400"}
                  className="card-img-top"
                  alt={event.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {event.location}
                    <br />
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <Link to={`/event/${event.id}`} className="btn btn-primary me-2">
                    View Details
                  </Link>
                  <button onClick={() => handleCancelRegistration(event.id)} className="btn btn-danger">
                    Cancel Registration
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEventsPage

