import { type Request, type Response, type NextFunction } from 'express'
import logger from '../utils/logger.ts'
import multer from 'multer'

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).send('Not Found')
}

const serverErrorsHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack)
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size must not exceed 5MB',
      })
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    })
  }

  if (err.message === 'Only image files are allowed') {
    return res.status(415).json({
      success: false,
      message: 'Only image files are allowed',
    })
  }

  return res.status(500).json({
    success: false,
    message: 'Something broke!',
  })
}

export default { notFoundHandler, serverErrorsHandler }
