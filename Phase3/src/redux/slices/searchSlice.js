import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "../actions/searchActions";

const initialState = {
  books: [],
  loading: false,
  error: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.books = [];
      state.loading = false;
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })

      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export const { clearSearch } = searchSlice.actions;

export default searchSlice.reducer;