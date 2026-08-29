import express from 'express'
import experienceController from '../controllers/experience.controller.ts'
import protect from '../middlewares/auth.middleware.ts'
import validator from '../middlewares/validator.middleware.ts'
import {
  createExperienceValidator,
  updateExperienceValidator,
  getExperiencesValidator,
} from '../validators/experience.validator.ts'

export const experienceRouter = express.Router()

experienceRouter.get(
  '/',
  getExperiencesValidator,
  validator,
  experienceController.get
)

experienceRouter.post(
  '/',
  protect,
  createExperienceValidator,
  validator,
  experienceController.post
)
experienceRouter.patch(
  '/:id',
  protect,
  updateExperienceValidator,
  validator,
  experienceController.patchById
)
experienceRouter.delete('/:id', protect, experienceController.deleteById)
