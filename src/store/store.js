import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import favoritesReducer from './slices/favoritesSlice';
import listsReducer from './slices/listsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    lists: listsReducer
  }
});