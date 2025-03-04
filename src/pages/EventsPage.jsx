"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getEvents } from "../store/slices/eventsSlice"
import { toggleEventRegistration } from "../store/slices/userSlice"

const EventsPage = () => {
  const dispatch = useDispatch()
  const { events, loading } = useSelector((state) => state.events)
  const { registeredEvents } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  const handleToggleRegistration = (eventId) => {
    dispatch(toggleEventRegistration(eventId))
  }

  if (loading) {
    return <div className="container py-5 text-center">Loading events...</div>
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Upcoming Gaming Events</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {events.map((event) => (
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
                <button
                  onClick={() => handleToggleRegistration(event.id)}
                  className={`btn ${registeredEvents.includes(event.id) ? "btn-danger" : "btn-success"}`}
                >
                  {registeredEvents.includes(event.id) ? "Cancel Registration" : "Register"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsPage

