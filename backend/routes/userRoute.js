import express from 'express'
import { loginUser, registerUser, adminLogin, getUser } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/getuser',authUser, getUser);
userRouter.post('/admin', adminLogin);

export default userRouter;