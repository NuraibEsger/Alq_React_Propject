import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    title: 'New List',
    movies: []
  },
  reducers: {
    setFavoritesTitle: (state, action) => {
      state.title = action.payload;
    },
    addFavoriteMovie: (state, action) => {
      const movie = action.payload;
      const existing = state.movies.find(m => m.imdbID === movie.imdbID);
      if (!existing) {
        state.movies.push(movie);
      }
    },
    removeFavoriteMovie: (state, action) => {
      const imdbID = action.payload;
      state.movies = state.movies.filter(movie => movie.imdbID !== imdbID);
    },
    clearFavorites: (state) => {
      state.title = 'New List';
      state.movies = [];
    }
  }
});

export const { setFavoritesTitle, addFavoriteMovie, removeFavoriteMovie, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
