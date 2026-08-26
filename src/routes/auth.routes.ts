import express from 'express'
import authController from '../controllers/auth.controller.ts'
import protect from '../middlewares/auth.middleware.ts'

export const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/me', protect, authController.getMe)
