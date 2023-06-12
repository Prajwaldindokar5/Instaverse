import dotenv from 'dotenv';
import AppError from '../utils/appError.js';
dotenv.config();

const handleDuplicateKeyError = (err) => {
  const message = ` (${Object.keys(err.keyValue)}: ${
    Object.values(err.keyValue)[0]
  }) is already taken please use another`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res, next) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    name: err.name,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

export default (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'something went wrong!';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.code === 11000) err = handleDuplicateKeyError(err);
    sendErrorProd(err, req, res);
  }
};
