import { type NextFunction, type Request, type Response } from 'express'
import { processAndSaveImage, removeImage } from '../services/upload.service.ts'
const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      })
    }

    const result = await processAndSaveImage(req.file.buffer, req.query)
    return res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { publicId } = req.body

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'publicId is required',
      })
    }

    const result = await removeImage(publicId)

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export default { uploadImage, deleteImage }
