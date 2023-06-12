import Comment from '../models/commentModel.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';
import Post from '../models/postModel.js';

//
export const createComment = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  // create commment

  const comment = new Comment({
    comment: req.body.comment,
    user: req.user.id,
    post: postId,
  });

  await comment.save();

  res.status(201).json({
    status: 'succes',
    comment,
  });
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    return next(new AppError('unable to find and delete', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Comment deleted Successfully',
  });
});
