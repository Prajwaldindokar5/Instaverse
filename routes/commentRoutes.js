import express from 'express';
import { verify } from '../controllers/authController.js';
import {
  createComment,
  deleteComment,
} from '../controllers/commentController.js';

const router = express.Router();

router.post('/:postId/createComment', verify, createComment);
router.delete('/:id/deleteComment', verify, deleteComment);
export default router;
