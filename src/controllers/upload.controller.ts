import { type NextFunction, type Request, type Response } from 'express'
import { processAndSaveImage } from '../services/upload.service.ts'
const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      })
    }

    const image = await processAndSaveImage(req.file.buffer)
    return res.status(201).json({
      success: true,
      data: image,
    })
  } catch (error) {
    next(error)
  }
}

export default { uploadImage }
