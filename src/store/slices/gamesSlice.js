import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchGames,
  searchGames,
  fetchGameDetails,
  fetchPopularGames,
  fetchGamesByTagOrGenre,
  fetchPublishers,
  fetchPublisherDetails,
  fetchPublisherGames,
  searchPublishers,
  fetchTags,
  searchTags,
} from "../../services/api"

// Thunks
export const getGames = createAsyncThunk("games/getGames", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await fetchGames(page)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const getPopularGames = createAsyncThunk("games/getPopularGames", async (_, { rejectWithValue }) => {
  try {
    const games = await fetchPopularGames()
    return games
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const searchGamesThunk = createAsyncThunk(
  "games/searchGames",
  async ({ searchTerm, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await searchGames(searchTerm, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getGameDetails = createAsyncThunk("games/getGameDetails", async (id, { rejectWithValue }) => {
  try {
    const game = await fetchGameDetails(id)
    return game
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const getGamesByTagOrGenre = createAsyncThunk(
  "games/getGamesByTagOrGenre",
  async ({ type, id, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetchGamesByTagOrGenre(type, id, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getPublishers = createAsyncThunk("games/getPublishers", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await fetchPublishers(page)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const searchPublishersThunk = createAsyncThunk(
  "games/searchPublishers",
  async ({ searchTerm, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await searchPublishers(searchTerm, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getPublisherDetails = createAsyncThunk("games/getPublisherDetails", async (id, { rejectWithValue }) => {
  try {
    const publisher = await fetchPublisherDetails(id)
    return publisher
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const getPublisherGames = createAsyncThunk(
  "games/getPublisherGames",
  async ({ id, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetchPublisherGames(id, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getTags = createAsyncThunk("games/getTags", async (page = 1, { rejectWithValue }) => {
  try {
    const response = await fetchTags(page)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const searchTagsThunk = createAsyncThunk(
  "games/searchTags",
  async ({ searchTerm, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await searchTags(searchTerm, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState = {
  games: [],
  popularGames: [],
  gameDetails: null,
  publishers: [],
  publisherDetails: null,
  publisherGames: [],
  tags: [],
  gamesByTagOrGenre: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  sortCriteria: "name",
  sortDirection: "asc",
}

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setSortCriteria: (state, action) => {
      state.sortCriteria = action.payload
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // getGames
      .addCase(getGames.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.loading = false
        state.games = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(getGames.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getPopularGames
      .addCase(getPopularGames.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPopularGames.fulfilled, (state, action) => {
        state.loading = false
        state.popularGames = action.payload
      })
      .addCase(getPopularGames.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // searchGames
      .addCase(searchGamesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchGamesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.games = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(searchGamesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getGameDetails
      .addCase(getGameDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getGameDetails.fulfilled, (state, action) => {
        state.loading = false
        state.gameDetails = action.payload
      })
      .addCase(getGameDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getGamesByTagOrGenre
      .addCase(getGamesByTagOrGenre.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getGamesByTagOrGenre.fulfilled, (state, action) => {
        state.loading = false
        state.gamesByTagOrGenre = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(getGamesByTagOrGenre.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getPublishers
      .addCase(getPublishers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPublishers.fulfilled, (state, action) => {
        state.loading = false
        state.publishers = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(getPublishers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // searchPublishers
      .addCase(searchPublishersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchPublishersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.publishers = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(searchPublishersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getPublisherDetails
      .addCase(getPublisherDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPublisherDetails.fulfilled, (state, action) => {
        state.loading = false
        state.publisherDetails = action.payload
      })
      .addCase(getPublisherDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getPublisherGames
      .addCase(getPublisherGames.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPublisherGames.fulfilled, (state, action) => {
        state.loading = false
        state.publisherGames = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(getPublisherGames.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getTags
      .addCase(getTags.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.loading = false
        state.tags = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(getTags.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // searchTags
      .addCase(searchTagsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchTagsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.tags = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(searchTagsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setSortCriteria, setSortDirection, setCurrentPage } = gamesSlice.actions

export default gamesSlice.reducer

