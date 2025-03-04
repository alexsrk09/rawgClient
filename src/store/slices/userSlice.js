import { createSlice } from "@reduxjs/toolkit"

// Función para cargar favoritos desde localStorage
const loadFavorites = () => {
  try {
    const favorites = localStorage.getItem("favorites")
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error)
    return []
  }
}

// Función para cargar eventos registrados desde localStorage
const loadRegisteredEvents = () => {
  try {
    const registeredEvents = localStorage.getItem("registeredEvents")
    return registeredEvents ? JSON.parse(registeredEvents) : []
  } catch (error) {
    console.error("Error loading registered events from localStorage:", error)
    return []
  }
}

const initialState = {
  user: {
    name: "User",
    avatar: "/user-avatar.jpg",
  },
  favorites: loadFavorites(),
  registeredEvents: loadRegisteredEvents(),
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const gameId = action.payload
      const index = state.favorites.findIndex((id) => id === gameId)

      if (index === -1) {
        state.favorites.push(gameId)
      } else {
        state.favorites.splice(index, 1)
      }

      // Guardar en localStorage
      localStorage.setItem("favorites", JSON.stringify(state.favorites))
    },
    toggleEventRegistration: (state, action) => {
      const eventId = action.payload
      const index = state.registeredEvents.findIndex((id) => id === eventId)

      if (index === -1) {
        state.registeredEvents.push(eventId)
      } else {
        state.registeredEvents.splice(index, 1)
      }

      // Guardar en localStorage
      localStorage.setItem("registeredEvents", JSON.stringify(state.registeredEvents))
    },
  },
})

export const { toggleFavorite, toggleEventRegistration } = userSlice.actions

export default userSlice.reducer

