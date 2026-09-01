import express from 'express'
import protect from '../middlewares/auth.middleware.ts'
import validator from '../middlewares/validator.middleware.ts'
import skillController from '../controllers/skill.controller.ts'
import {
  createSkillValidator,
  getSkillsValidator,
  updateSkillValidator,
} from '../validators/skill.validator.ts'

export const skillRouter = express.Router()

skillRouter.get('/', getSkillsValidator, validator, skillController.get)
skillRouter.get('/id/:id', skillController.getById)

skillRouter.post(
  '/',
  protect,
  createSkillValidator,
  validator,
  skillController.post
)

skillRouter.patch(
  '/id/:id',
  protect,
  updateSkillValidator,
  validator,
  skillController.patchById
)

skillRouter.delete('/id/:id', protect, skillController.deleteById)
