import express from 'express';
import userController from '../api/controllers/user.controller';
export const userRouter = express.Router();

//singup
userRouter.post('/register', userController.signup)

//signin
userRouter.post('/signin', userController.signin)

//reset
userRouter.get('/reset/:id', userController.accessReset)
userRouter.post('/reset', userController.reset)
userRouter.post('/resetpassword', userController.resetPass)
