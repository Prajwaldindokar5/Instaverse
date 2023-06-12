import express from 'express';
import { verify } from '../controllers/authController.js';
import {
  addStory,
  deleteStory,
  getAllStories,
  getStory,
} from '../controllers/storyController.js';

const router = express.Router();

router.post('/addStory', verify, addStory);
router.get('/', verify, getAllStories);

router.route('/:id', verify).get(getStory).delete(deleteStory);
export default router;
