import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "search/fetchBooks",
  async (query, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}`,
        { signal }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const data = await response.json();

      return data.docs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);