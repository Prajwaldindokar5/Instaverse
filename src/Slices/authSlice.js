import { createSlice } from "@reduxjs/toolkit";
import secureStorage from "react-secure-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: secureStorage.getItem("instaverse_userInfo")
      ? JSON.parse(secureStorage.getItem("instaverse_userInfo"))
      : null,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      state.userInfo = user;
      secureStorage.setItem("instaverse_userInfo", JSON.stringify(user));
    },

    logoutUser(state) {
      state.userInfo = null;
      secureStorage.removeItem("instaverse_userInfo");
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
