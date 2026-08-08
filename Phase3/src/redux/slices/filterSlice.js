import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subject: "all",
  language: "all",
  sort: "relevance",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSubject(state, action) {
      state.subject = action.payload;
    },

    setLanguage(state, action) {
      state.language = action.payload;
    },

    setSort(state, action) {
      state.sort = action.payload;
    },

    resetFilters(state) {
      state.subject = "all";
      state.language = "all";
      state.sort = "relevance";
    },
  },
});

export const {
  setSubject,
  setLanguage,
  setSort,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;