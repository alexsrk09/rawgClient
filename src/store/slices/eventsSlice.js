import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchEvents, fetchEventById } from "../../services/events"

// Thunks
export const getEvents = createAsyncThunk("events/getEvents", async (_, { rejectWithValue }) => {
  try {
    const events = await fetchEvents()
    return events
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const getEventById = createAsyncThunk("events/getEventById", async (id, { rejectWithValue }) => {
  try {
    const event = await fetchEventById(id)
    return event
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
}

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getEvents
      .addCase(getEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getEventById
      .addCase(getEventById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.loading = false
        state.currentEvent = action.payload
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default eventsSlice.reducer

