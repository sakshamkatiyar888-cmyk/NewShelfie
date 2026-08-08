import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

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

      const params = {
        q: query,
      };

      if (subject !== "all") {
        params.subject = subject;
      }

      if (language !== "all") {
        params.language = language;
      }

      if (sort !== "relevance") {
        params.sort = sort;
      }

      const response = await apiClient.get("/search.json", {
        params,
        signal,
      });

      return {
        books: response.data.docs,
        cacheKey,
        fromCache: false,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);