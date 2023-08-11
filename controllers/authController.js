import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Email from '../utils/email.js';
import crypto from 'crypto';

//
dotenv.config();

//register user

const signJwt = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

const sendResponse = (user, res, statusCode) => {
  const token = signJwt(user.id);

  user.password = undefined;

  res.cookie('jwt', token).status(statusCode).json({
    status: 'success',
    user,
  });
};

export const register = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const user = new User({
    name,
    username,
    email,
    password,
    totalFollowers: 0,
    totalFollowing: 0,
    postsQuantity: 0,
  });

  await user.save();

  sendResponse(user, res, 201);
});

export const login = asyncHandler(async (req, res, next) => {
  // get username and password
  const { username, password } = req.body;

  // get user with the username
  const user = await User.findOne({ username })
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    })
    .populate({
      path: 'stories',
    });

  //check if password is correct and user exists with thr username
  if (!user || !(await user.isCorrect(password, user.password))) {
    return next(new AppError('Invalid username or password', 400));
  }

  //if everything is ok send token

  sendResponse(user, res, 200);
});

export const logout = (req, res, next) => {
  res.clearCookie('jwt', {
    secure: true,
  });
  res.status(200).json({
    status: 'success',
    message: 'Logot Successfull',
  });
};

// verifyToken
export const verify = asyncHandler(async (req, res, next) => {
  // getting jwt from cookie
  const token = req.cookies.jwt;

  //check if token exists
  if (!token) {
    return next(new AppError('You are not loggedIn, please login!', 401));
  }

  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // getting user from decoded
  const user = await User.findById(decoded.id);

  //if everithing is ok
  req.user = user;
  next();
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  //getting user
  const user = await User.findById(req.user.id);

  // getting current password & password
  const { currentPassword, password } = req.body;

  // checking is current password is correct
  const isCorrect = await user.isCorrect(currentPassword, user.password);
  if (!isCorrect) {
    return next(new AppError('Current Password is not correct', 400));
  }

  user.password = password;
  await user.save();

  res.status(200).json({
    status: 'success',
    user,
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { username } = req.body;

  // getting user by username
  const user = await User.findOne({ username });
  if (!user) {
    return next(
      new AppError('Unable to find user, please user correct username', 404)
    );
  }

  //getting reset token and updateing the password reset token;
  const resetToken = user.createResetToken();
  await user.save();

  const resetUrl = `http://localhost:3000/account/resetPassword/${resetToken}`;

  try {
    new Email(user, resetUrl).send('Password Reset');

    res.status(200).json({
      resetToken,
      status: 'success',
      message: 'Reset Link send To your registered Email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.resetTokenExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('Unable to send Mail', 500));
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  // getting token

  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // get user based onn hashed token

  const user = await User.findOne({
    passwordResetToken: resetToken,
    resetTokenExpiresAt: { $gt: Date.now() },
  })
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    })
    .populate({
      path: 'stories',
    });
  if (!user) {
    return next(
      new AppError(
        'Invalid Reset Token or Token is expired, please try again.',
        400
      )
    );
  }

  //reset password
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.resetTokenExpiresAt = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    user,
  });
});
