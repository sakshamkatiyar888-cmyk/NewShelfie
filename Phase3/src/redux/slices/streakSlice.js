import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: JSON.parse(localStorage.getItem("readingStreak"))?.count || 0,
  lastCompletedDate:
    JSON.parse(localStorage.getItem("readingStreak"))?.lastCompletedDate || null,
};

const saveToLocalStorage = (state) => {
  localStorage.setItem(
    "readingStreak",
    JSON.stringify(state)
  );
};

const streakSlice = createSlice({
  name: "streak",
  initialState,
  reducers: {
    updateReadingStreak: (state) => {
      const today = new Date().toISOString().split("T")[0];

      if (state.lastCompletedDate !== today) {
        state.count += 1;
        state.lastCompletedDate = today;

        saveToLocalStorage(state);
      }
    },

    resetReadingStreak: (state) => {
      state.count = 0;
      state.lastCompletedDate = null;

      saveToLocalStorage(state);
    },
  },
});

export const {
  updateReadingStreak,
  resetReadingStreak,
} = streakSlice.actions;

export default streakSlice.reducer;