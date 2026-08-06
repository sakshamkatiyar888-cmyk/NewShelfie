import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myBooks:JSON.parse(
    localStorage.getItem("myBooks")
  ) || [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const alreadyExists = state.myBooks.some(
        (book) => book.key === action.payload.key
      );

      if (!alreadyExists) {
        state.myBooks.push(action.payload);

        localStorage.setItem(
            "myBooks",
            JSON.stringify(state.myBooks)
        );
      }
    },

    removeBook: (state, action) => {
      state.myBooks = state.myBooks.filter(
        (book) => book.key !== action.payload
      );
      localStorage.setItem(
        "myBooks",
        JSON.stringify(state.myBooks)
      );
    },
  },
});

export const { addBook, removeBook } =
  librarySlice.actions;

export default librarySlice.reducer;