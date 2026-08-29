import express from 'express'
import protect from '../middlewares/auth.middleware.ts'
import validator from '../middlewares/validator.middleware.ts'
import skillController from '../controllers/skill.controller.ts'
import {
  createSkillValidator,
  updateSkillValidator,
} from '../validators/skill.validator.ts'

export const skillRouter = express.Router()

skillRouter.get('/', skillController.get)

skillRouter.post(
  '/',
  protect,
  createSkillValidator,
  validator,
  skillController.post
)

skillRouter.patch(
  '/:id',
  protect,
  updateSkillValidator,
  validator,
  skillController.patchById
)

skillRouter.delete('/:id', protect, skillController.deleteById)
