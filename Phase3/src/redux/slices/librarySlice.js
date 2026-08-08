import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myBooks: JSON.parse(localStorage.getItem("myBooks")) || [],
};

const saveToLocalStorage = (books) => {
  localStorage.setItem("myBooks", JSON.stringify(books));
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
        const newBook = {
          ...action.payload,
          status: action.payload.status || "unread",
        };

        state.myBooks.push(newBook);
        saveToLocalStorage(state.myBooks);
      }
    },

    removeBook: (state, action) => {
      state.myBooks = state.myBooks.filter(
        (book) => book.key !== action.payload
      );

      saveToLocalStorage(state.myBooks);
    },

    startReading: (state, action) => {
      const book = state.myBooks.find(
        (book) => book.key === action.payload
      );

      if (book) {
        book.status = "reading";
        saveToLocalStorage(state.myBooks);
      }
    },

    markAsFinished: (state, action) => {
      const book = state.myBooks.find(
        (book) => book.key === action.payload
      );

      if (book) {
        book.status = "finished";
        saveToLocalStorage(state.myBooks);
      }
    },

    markAsUnread: (state, action) => {
      const book = state.myBooks.find(
        (book) => book.key === action.payload
      );

      if (book) {
        book.status = "unread";
        saveToLocalStorage(state.myBooks);
      }
    },
  },
});

export const {
  addBook,
  removeBook,
  startReading,
  markAsFinished,
  markAsUnread,
} = librarySlice.actions;

export default librarySlice.reducer;