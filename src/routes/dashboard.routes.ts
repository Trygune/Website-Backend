import express from 'express'
import dashboardController from '../controllers/dashboard.controller.ts'
import protect from '../middlewares/auth.middleware.ts'

export const dashboardRouter = express.Router()

dashboardRouter.get('/', protect, dashboardController)
