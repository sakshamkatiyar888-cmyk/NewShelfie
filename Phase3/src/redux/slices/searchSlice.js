import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "../actions/searchActions";

const initialState = {
  books: [],
  loading: false,
  error: "",
  currentRequestId: null,
  cache: {},
};

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {
    clearSearch: (state) => {
      state.books = [];
      state.loading = false;
      state.error = "";
      state.currentRequestId = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchBooks.pending, (state, action) => {
        const { query, subject, language, sort } = action.meta.arg;

        const cacheKey = `${query.trim().toLowerCase()}|${subject}|${language}|${sort}`;

        state.error = "";
        state.currentRequestId = action.meta.requestId;

        if (state.cache[cacheKey]) {
          state.loading = false;
          state.books = state.cache[cacheKey];
        } else {
          state.loading = true;
        }
      })

      .addCase(fetchBooks.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        const { books, cacheKey } = action.payload;

        state.loading = false;
        state.books = books;

        state.cache[cacheKey] = books;

        state.currentRequestId = null;
      })

      .addCase(fetchBooks.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;

        if (action.meta.aborted) {
          state.error = "";
        } else {
          state.error =
            action.payload || "Something went wrong";
        }

        state.currentRequestId = null;
      });
  },
});

export const { clearSearch } = searchSlice.actions;

export default searchSlice.reducer;