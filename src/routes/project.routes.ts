import express from 'express'
import projectController from '../controllers/project.controller.ts'
import protect from '../middlewares/auth.middleware.ts'
import {
  createProjectValidator,
  getProjectsValidator,
  updateProjectValidator,
} from '../validators/project.validator.ts'
import validator from '../middlewares/validator.middleware.ts'

export const projectRouter = express.Router()

projectRouter.get('/', getProjectsValidator, validator, projectController.get)
projectRouter.get('/:slug', projectController.getBySlug)
projectRouter.get('/id/:id', projectController.getById)

projectRouter.post(
  '/',
  protect,
  createProjectValidator,
  validator,
  projectController.post
)
projectRouter.patch(
  '/id/:id',
  protect,
  updateProjectValidator,
  validator,
  projectController.patchById
)
projectRouter.delete('/id/:id', protect, projectController.deleteById)
