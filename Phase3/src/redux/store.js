import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import libraryReducer from "./slices/librarySlice";
import searchReducer from "./slices/searchSlice";
import streakReducer from "./slices/streakSlice";
const store = configureStore({
  reducer: {
    search: searchReducer,
    library: libraryReducer,
    filter: filterReducer,
     streak: streakReducer,
  },
});

export default store;