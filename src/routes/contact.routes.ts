import { Router } from 'express'

import { createContact } from '../controllers/contact.controller.js'
import { createContactValidator } from '../validators/contact.validator.js'
import { contactLimiter } from '../middlewares/rateLimiter.middleware.ts'
import validator from '../middlewares/validator.middleware.ts'

const contactRouter = Router()

contactRouter.post(
  '/',
  contactLimiter,
  createContactValidator,
  validator,
  createContact
)

export default contactRouter
