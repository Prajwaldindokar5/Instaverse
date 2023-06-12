import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';
import Story from '../models/storyModel.js';

export const addStory = asyncHandler(async (req, res, next) => {
  const { story } = req.body;

  const newStory = new Story({
    story,
    user: req.user.id,
  });

  await newStory.save();

  res.status(201).json({
    status: 'success',
    newStory,
  });
});

export const getAllStories = asyncHandler(async (req, res, next) => {
  const stories = await Story.find().populate({
    path: 'user',
    select: 'username photo stories',
  });

  await Story.scheduleStoryDeletion();

  res.status(200).json({
    status: 'success',
    stories,
  });
});

export const getStory = asyncHandler(async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    return next(new AppError('Unable to find Story', 404));
  }

  res.status(200).json({
    status: 'success',
    story,
  });
});

export const deleteStory = asyncHandler(async (req, res, next) => {
  const story = await Story.findByIdAndDelete(req.params.id);
  if (!story) {
    return next(new AppError('Unable to find Story', 404));
  }

  res.status(200).json({
    status: 'success',
    story,
  });
});
