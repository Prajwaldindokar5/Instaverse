import Post from '../models/postModel.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';

export const manageLike = asyncHandler(async (req, res, next) => {
  // getting the post
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // checking is user is loggedIn
  const user = await User.findById(req.user.id).select('name photo');

  // grtting index of user like
  const indexOfLike = post.likes.findIndex((like) => like === user._id);

  // if user id is not there
  if (!post.likes.includes(user._id)) {
    post.likes.push(user._id);
    post.likesQuantity = post.likes.length;
    await post.save();
  }
  //if user id is there
  else {
    post.likes.splice(indexOfLike, 1);
    post.likesQuantity = post.likes.length;
    await post.save();
  }

  res.status(200).json({
    status: 'success',
    post,
  });
});
