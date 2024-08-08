import express from 'express'
import { createUser } from '../controller/UserController'

export const userRouter = express.Router();

userRouter.post('/',createUser);