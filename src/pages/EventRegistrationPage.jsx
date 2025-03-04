"use client"

import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getEventById } from "../store/slices/eventsSlice"
import { toggleEventRegistration } from "../store/slices/userSlice"

const EventRegistrationPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentEvent, loading } = useSelector((state) => state.events)
  const { registeredEvents } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getEventById(Number.parseInt(id)))
  }, [dispatch, id])

  useEffect(() => {
    if (currentEvent && !registeredEvents.includes(Number.parseInt(id))) {
      // Auto-register the user for the event
      dispatch(toggleEventRegistration(Number.parseInt(id)))
    }
  }, [currentEvent, registeredEvents, id, dispatch])

  if (loading || !currentEvent) {
    return <div className="container py-5 text-center">Processing your registration...</div>
  }

  return (
    <div className="container py-5 text-center">
      <div className="alert alert-success mb-4" role="alert">
        <h4 className="alert-heading">Registration Successful!</h4>
        <p>
          You have been registered for the event: <strong>{currentEvent.title}</strong>
        </p>
      </div>
      <img
        src={currentEvent.image || "/placeholder.svg?height=300&width=600"}
        alt={currentEvent.title}
        className="img-fluid rounded mb-4"
        style={{ maxHeight: "300px", maxWidth: "600px", objectFit: "cover" }}
      />
      <div className="mb-4">
        <h2>Event Details</h2>
        <p className="lead">{currentEvent.description}</p>
        <p>
          <strong>Location:</strong> {currentEvent.location}
          <br />
          <strong>Date:</strong> {new Date(currentEvent.date).toLocaleDateString()}
        </p>
      </div>
      <div className="d-flex justify-content-center gap-3">
        <Link to={`/event/${id}`} className="btn btn-primary">
          View Event Details
        </Link>
        <Link to="/my-events" className="btn btn-secondary">
          View My Events
        </Link>
      </div>
    </div>
  )
}

export default EventRegistrationPage

