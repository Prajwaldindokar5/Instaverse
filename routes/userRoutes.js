import express from 'express';
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  verify,
} from '../controllers/authController.js';
import {
  getAllUsers,
  getLoginUser,
  getUser,
  manageFollow,
  manageSave,
  manageUnfollow,
  removeFollower,
  updateProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/updatePassword', verify, updatePassword);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateProfile', verify, updateProfile);
router.get('/logout', verify, logout);
router.get('/:id', verify, getLoginUser);
router.get('/profile/:username', verify, getUser);
router.get('/', verify, getAllUsers);
//follow functionality
router.post('/manageFollow/:id', verify, manageFollow);
router.post('/removeFollower/:id', verify, removeFollower);
router.post('/manageUnfollow/:id', verify, manageUnfollow);
//saveFunctionality
router.post('/:postId/manageSave', verify, manageSave);

export default router;
