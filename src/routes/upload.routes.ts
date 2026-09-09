import express from 'express'
import protect from '../middlewares/auth.middleware.ts'
import upload from '../middlewares/upload.middleware.ts'
import uploadController from '../controllers/upload.controller.ts'

export const uploadRouter = express.Router()

uploadRouter.post(
  '/image',
  protect,
  upload.single('coverImage'),
  uploadController.uploadImage
)

uploadRouter.delete('/image/delete/:id', protect, uploadController.deleteImage)
