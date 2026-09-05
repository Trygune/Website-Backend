import express from 'express'
import authController from '../controllers/auth.controller.ts'
import protect from '../middlewares/auth.middleware.ts'
import loginLimiter from '../middlewares/rateLimiter.middleware.ts'

export const authRouter = express.Router()

authRouter.post('/forgot-password', authController.forgot)
authRouter.post('/reset-password/:token', authController.reset)
authRouter.post('/login', loginLimiter, authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/me', protect, authController.getMe)
