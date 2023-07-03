import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: localStorage.getItem("instaverse_userInfo")
      ? JSON.parse(localStorage.getItem("instaverse_userInfo"))
      : null,

    token: localStorage.getItem("instaverse_token")
      ? JSON.parse(localStorage.getItem("instaverse_token"))
      : null,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state.userInfo = user;

      localStorage.setItem("instaverse_userInfo", JSON.stringify(user));
    },
    setToken(state, action) {
      const token = action.payload;
      state.token = token;
      localStorage.setItem("instaverse_token", JSON.stringify(token));
    },

    logoutUser(state) {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("instaverse_userInfo");
      localStorage.removeItem("instaverse_token");
    },
  },
});

export const { setUser, logoutUser, setToken } = authSlice.actions;

export default authSlice.reducer;
