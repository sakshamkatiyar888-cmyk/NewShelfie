import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");

const initialState = {
  token: savedToken || null,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload);
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;