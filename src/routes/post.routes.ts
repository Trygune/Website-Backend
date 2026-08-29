import express from 'express'
import postController from '../controllers/post.controller.ts'
import protect from '../middlewares/auth.middleware.ts'
import validator from '../middlewares/validator.middleware.ts'
import {
  createPostValidator,
  updatePostValidator,
  getPostsValidator,
} from '../validators/post.validator.ts'

export const postRouter = express.Router()

postRouter.get('/', getPostsValidator, validator, postController.get)
postRouter.get('/:slug', postController.getBySlug)

postRouter.post(
  '/',
  protect,
  createPostValidator,
  validator,
  postController.post
)
postRouter.patch(
  '/:id',
  protect,
  updatePostValidator,
  validator,
  postController.patchById
)
postRouter.delete('/:id', protect, postController.deleteById)
