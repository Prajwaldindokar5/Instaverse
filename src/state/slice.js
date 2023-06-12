import { createSlice } from "@reduxjs/toolkit";

export const appSlicer = createSlice({
  name: "data",
  initialState: {
    user: null,

    userPosts: null,
    allPosts: [],
    getUser: null,
    allUsers: [],
    isSearch: false,
    navShrink: false,
    stories: [],
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    setAllPosts(state, action) {
      state.allPosts = action.payload;
    },
    setGetUser(state, action) {
      state.getUser = action.payload;
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    setIsSearch(state, action) {
      state.isSearch = action.payload;
    },
    setNavShrink(state, action) {
      state.navShrink = action.payload;
    },
    setStories(state, action) {
      state.stories = action.payload;
    },
  },
});

export const {
  setUser,

  setAllPosts,
  setGetUser,
  setAllUsers,
  setIsSearch,
  setNavShrink,
  setStories,
} = appSlicer.actions;

export default appSlicer.reducer;
