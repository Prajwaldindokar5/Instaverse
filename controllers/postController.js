import Post from '../models/postModel.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';
import { query } from 'express';

export const createPost = asyncHandler(async (req, res, next) => {
  const { content, caption } = req.body;

  const post = new Post({
    content,
    caption,
    user: req.user.id,
  });

  await post.save({ validateBeforeSave: true });

  res.status(201).json({
    status: 'success',
    post,
  });
});

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort('-createdAt');
  
  res.status(200).json({
    results: posts.length,
    status: 'success',
    posts,
  });
});

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Unable to find Post', 404));
  }

  res.status(200).json({
    status: 'success',
    post,
  });
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      caption: req.body.caption,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!post) {
    return next(new AppError('Unable to find and Update Post', 404));
  }

  res.status(200).json({
    status: 'success',
    post,
  });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError('Unable to find Post', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
