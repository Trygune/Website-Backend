import { Router } from 'express'

import {
  getAnalytics,
  trackVisit,
} from '../controllers/analytics.controller.ts'
import protect from '../middlewares/auth.middleware.ts'
import {
  getAnalyticsValidator,
  trackVisitValidator,
} from '../validators/analytics.validator.ts'
import validator from '../middlewares/validator.middleware.ts'

const analyticsRouter = Router()

analyticsRouter.get(
  '/',
  protect,
  getAnalyticsValidator,
  validator,
  getAnalytics
)

analyticsRouter.post('/', trackVisitValidator, trackVisit)

export default analyticsRouter
