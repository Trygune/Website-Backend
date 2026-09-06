import { Router } from 'express'

import contactController from '../controllers/contact.controller.js'
import {
  createContactValidator,
  updateContactValidator,
} from '../validators/contact.validator.js'
import { contactLimiter } from '../middlewares/rateLimiter.middleware.ts'
import validator from '../middlewares/validator.middleware.ts'
import protect from '../middlewares/auth.middleware.ts'

const contactRouter = Router()

contactRouter.get('/', protect, contactController.get)

contactRouter.post(
  '/',
  contactLimiter,
  createContactValidator,
  validator,
  contactController.post
)

contactRouter.patch(
  '/id/:id',
  protect,
  updateContactValidator,
  validator,
  contactController.patchById
)

contactRouter.delete('/id/:id', protect, contactController.deleteById)

export default contactRouter
