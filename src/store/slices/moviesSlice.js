import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'f0180e5a';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMoviesByTitle = createAsyncThunk(
  'movies/fetchMoviesByTitle',
  async (title) => {
    const response = await fetch(`${BASE_URL}?s=${title}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Search) {
      return data.Search.map(movie => ({
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }));
    } else {
      return [];
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    searchResults: [],
    status: 'idle',
    error: null
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByTitle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMoviesByTitle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchMoviesByTitle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearSearchResults } = moviesSlice.actions;
export default moviesSlice.reducer;
