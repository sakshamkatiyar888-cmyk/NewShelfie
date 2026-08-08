import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "search/fetchBooks",

  async (
    { query, subject, language, sort },
    { signal, rejectWithValue, getState }
  ) => {
    try {
      const cacheKey = `${query.trim().toLowerCase()}|${subject}|${language}|${sort}`;

      const cachedBooks = getState().search.cache[cacheKey];

      if (cachedBooks) {
        return {
          books: cachedBooks,
          cacheKey,
          fromCache: true,
        };
      }

      const params = new URLSearchParams();

      params.set("q", query);

      if (subject !== "all") {
        params.set("subject", subject);
      }

      if (language !== "all") {
        params.set("language", language);
      }

      if (sort !== "relevance") {
        params.set("sort", sort);
      }

      const response = await fetch(
        `https://openlibrary.org/search.json?${params.toString()}`,
        { signal }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const data = await response.json();

      return {
        books: data.docs,
        cacheKey,
        fromCache: false,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);