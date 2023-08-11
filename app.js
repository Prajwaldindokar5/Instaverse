import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import storyRouter from './routes/storyRoutes.js';

const app = express();
dotenv.config();

//middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
postRouter.use('/', commentRouter);
app.use('/api/v1/story', storyRouter);

// api request error handling
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Unable to find ${req.originalUrl} on this server`, 404)
  );
});

//global error handling
app.use(globalErrorHandler);
export default app;
