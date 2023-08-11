import { createSlice } from "@reduxjs/toolkit";

export const appSlicer = createSlice({
  name: "data",
  initialState: {
    userPosts: null,
    allPosts: [],
    getUser: null,
    allUsers: [],
    isSearch: false,
    navShrink: false,
    stories: [],
    isCreate: false,
    followingPosts: [],
  },

  reducers: {
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
    setIsCreate(state, action) {
      state.isCreate = action.payload;
    },
    setFollowingPosts(state, action) {
      state.followingPosts = action.payload;
    },
  },
});

export const {
  setAllPosts,
  setGetUser,
  setAllUsers,
  setIsSearch,
  setNavShrink,
  setStories,
  setFBLogin,
  setIsCreate,
  setFollowingPosts,
} = appSlicer.actions;

export default appSlicer.reducer;
