import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from '../controllers/postController.js';
import { verify } from '../controllers/authController.js';
import { manageLike } from '../controllers/likeController.js';

const router = express.Router();

router.route('/').post(verify, createPost).get(verify, getAllPosts);
router
  .route('/:id')
  .get(verify, getPost)
  .patch(verify, updatePost)
  .delete(verify, deletePost);

router.post('/:id/manageLike', verify, manageLike);
export default router;
