"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getEventById } from "../store/slices/eventsSlice"
import { toggleEventRegistration } from "../store/slices/userSlice"
import QRCode from "qrcode"

const EventDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentEvent, loading } = useSelector((state) => state.events)
  const { registeredEvents } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getEventById(Number.parseInt(id)))
  }, [dispatch, id])

  useEffect(() => {
    if (currentEvent) {
      // Generate QR code for sharing
      const qrCodeUrl = `${window.location.origin}/event/${currentEvent.id}`
      const canvas = document.getElementById("qrcode")

      if (canvas) {
        QRCode.toCanvas(
          canvas,
          qrCodeUrl,
          {
            width: 200,
            margin: 1,
          },
          (error) => {
            if (error) console.error(error)
          },
        )
      }
    }
  }, [currentEvent])

  const handleToggleRegistration = () => {
    dispatch(toggleEventRegistration(Number.parseInt(id)))
  }

  if (loading || !currentEvent) {
    return <div className="container py-5 text-center">Loading event details...</div>
  }

  const isRegistered = registeredEvents.includes(Number.parseInt(id))

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
          <h1 className="display-4 mb-3">{currentEvent.title}</h1>
          <img
            src={currentEvent.image || "/placeholder.svg?height=400&width=800"}
            alt={currentEvent.title}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
          />
          <div className="mb-4">
            <h2 className="h4">Event Details</h2>
            <p className="lead">{currentEvent.description}</p>
            <p>
              <strong>Location:</strong> {currentEvent.location}
              <br />
              <strong>Date:</strong> {new Date(currentEvent.date).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={handleToggleRegistration}
            className={`btn ${isRegistered ? "btn-danger" : "btn-success"} btn-lg`}
          >
            {isRegistered ? "Cancel Registration" : "Register for this Event"}
          </button>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title h5">Share this Event</h3>
              <p className="card-text">Scan this QR code to share this event with friends:</p>
              <div className="text-center">
                <canvas id="qrcode" className="img-fluid"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage

