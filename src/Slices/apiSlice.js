import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1",
  prepareHeaders(headers) {
    return headers;
  },
  credentials: "include",
});

const apiSLice = createApi({
  reducerPath: "appApi",
  baseQuery,
  tagTypes: ["Posts", "User"],
  endpoints: (builder) => ({
    allPosts: builder.query({
      providesTags: ["Posts"],
      query: () => ({
        method: "GET",
        url: "/post",
      }),
    }),
    getUser: builder.query({
      query: (username) => ({
        method: "GET",
        url: `/user/profile/${username}`,
      }),
    }),
    getStories: builder.query({
      query: () => ({
        method: "GET",
        url: "/story",
      }),
    }),
    manageLike: builder.mutation({
      invalidatesTags: ["Posts"],
      query: (postId) => ({
        method: "POST",
        url: `/post/${postId}/manageLike`,
      }),
    }),
    manageSave: builder.mutation({
      invalidatesTags: ["Posts"],
      query: (postId) => ({
        method: "POST",
        url: `/user/${postId}/manageSave`,
      }),
    }),
    addComment: builder.mutation({
      invalidatesTags: ["Posts"],
      query: ({ postID, comment }) => ({
        method: "POST",
        url: `/post/${postID}/createComment`,
        body: comment,
      }),
    }),
    addStory: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/story/addStory",
        body: data,
      }),
    }),
    addPost: builder.mutation({
      invalidatesTags: ["Posts"],
      query: (data) => ({
        method: "POST",
        url: "/post",
        body: data,
      }),
    }),
    allUsers: builder.query({
      query: () => ({
        method: "GET",
        url: "/user",
      }),
    }),
    deleteStory: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/story/${id}`,
      }),
    }),
  }),
});

export const {
  useAllPostsQuery,
  useGetUserQuery,
  useGetStoriesQuery,
  useAllUsersQuery,
  useManageLikeMutation,
  useManageSaveMutation,
  useAddCommentMutation,
  useAddStoryMutation,
  useAddPostMutation,
  useDeleteStoryMutation,
} = apiSLice;

export default apiSLice;
