import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./Slices/appSlice";
import authReducer from "./Slices/authSlice";
import userApi from "./Slices/userApiSlice";
import apiSLice from "./Slices/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [apiSLice.reducerPath]: apiSLice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, apiSLice.middleware]),
});
setupListeners(store.dispatch);
export default store;
