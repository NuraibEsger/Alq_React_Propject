import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const LISTS_API_BASE = 'https://acb-api.algoritmika.org/api/movies/list';

export const saveList = createAsyncThunk(
  'lists/saveList',
  async ({ title, movies }) => {
    const response = await fetch(LISTS_API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, movies })
    });
    const data = await response.json();
    return data;
  }
);

export const fetchListById = createAsyncThunk(
  'lists/fetchListById',
  async (id) => {
    const response = await fetch(`${LISTS_API_BASE}/${id}`);
    const data = await response.json();
    return data;
  }
);

export const fetchMovieById = createAsyncThunk(
  'lists/fetchMovieById',
  async (imdbID) => {
    const API_KEY = 'f0180e5a';
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();
    return {
      imdbID: data.imdbID,
      title: data.Title,
      year: data.Year,
      poster: data.Poster
    };
  }
);

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    currentList: null,
    currentListMovies: [],
    status: 'idle',
    error: null,
    savedLists: []
  },
  reducers: {
    clearCurrentList: (state) => {
      state.currentList = null;
      state.currentListMovies = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveList.pending, (state) => {
        state.status = 'saving';
      })
      .addCase(saveList.fulfilled, (state, action) => {
        state.status = 'saved';
        state.currentList = action.payload;
        state.currentListMovies = [];
      
        const alreadySaved = state.savedLists.find(l => l.id === action.payload.id);
        if (!alreadySaved) {
          state.savedLists.push(action.payload);
        }
      })      
      .addCase(saveList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchListById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentList = action.payload;
        state.currentListMovies = [];
      })
      .addCase(fetchListById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.currentListMovies.push(action.payload);
      });
  }
});

export const { clearCurrentList } = listsSlice.actions;
export default listsSlice.reducer;
