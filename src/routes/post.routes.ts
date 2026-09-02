import express from 'express'
import postController from '../controllers/post.controller.ts'
import protect from '../middlewares/auth.middleware.ts'
import validator from '../middlewares/validator.middleware.ts'
import {
  createPostValidator,
  updatePostValidator,
  getPostsValidator,
} from '../validators/post.validator.ts'
import upload from '../middlewares/upload.middleware.ts'

export const postRouter = express.Router()

postRouter.get('/', getPostsValidator, validator, postController.get)
postRouter.get('/:slug', postController.getBySlug)
postRouter.get('/id/:id', postController.getById)

postRouter.post(
  '/',
  protect,
  upload.single('coverImage'),
  createPostValidator,
  validator,
  postController.post
)
postRouter.patch(
  '/id/:id',
  protect,
  upload.single('coverImage'),
  updatePostValidator,
  validator,
  postController.patchById
)
postRouter.delete('/id/:id', protect, postController.deleteById)
