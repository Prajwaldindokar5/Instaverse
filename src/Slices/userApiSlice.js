import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1/user",
  prepareHeaders(headers) {
    return headers;
  },
  credentials: "include",
});

const userAPI = createApi({
  reducerPath: "user",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        method: "POST",
        url: "/login",
        body: {
          ...credentials,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/logout",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/register",
        body: {
          ...data,
        },
      }),
    }),
    editProfile: builder.mutation({
      query: ({ data }) => ({
        method: "PATCH",
        url: `updateProfile`,
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "forgotPassword",
        body: {
          ...data,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        method: "PATCH",
        url: `/resetPassword/${token}`,
        body: data,
      }),
    }),
    followUser: builder.mutation({
      query: (userId) => ({
        method: "POST",
        url: `/manageFollow/${userId}`,
      }),
    }),
    removeFollower: builder.mutation({
      query: (userId) => ({
        method: "POST",
        url: `/removeFollower/${userId}`,
      }),
    }),
    unfollowUser: builder.mutation({
      query: (userId) => ({
        method: "POST",
        url: `/manageUnfollow/${userId}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useEditProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useFollowUserMutation,
  useRemoveFollowerMutation,
  useUnfollowUserMutation,
} = userAPI;

export default userAPI;
