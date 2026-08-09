import { configureStore } from "@reduxjs/toolkit";

import libraryReducer from "./slices/librarySlice";
import searchReducer from "./slices/searchSlice";
import streakReducer from "./slices/streakSlice";
import filterReducer from "./slices/filterSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    library: libraryReducer,
    search: searchReducer,
    streak: streakReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});

export default store;