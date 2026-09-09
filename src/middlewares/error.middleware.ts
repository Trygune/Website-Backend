import { type Request, type Response, type NextFunction } from 'express'
import logger from '../utils/logger.ts'
import multer from 'multer'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const notFoundHandler = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  })
}

const serverErrorsHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.stack)

  // Multer errors
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

  // Invalid image type
  if (err.message === 'Only image files are allowed') {
    return res.status(415).json({
      success: false,
      message: 'Only image files are allowed',
    })
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string> = {}

    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message
    })

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    })
  }

  // Mongoose invalid ObjectId / CastError
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}`,
    })
  }

  // MongoDB duplicate key
  if ('code' in err && err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate value',
    })
  }

  // JWT errors
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: 'Token has expired',
    })
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
}

export default {
  notFoundHandler,
  serverErrorsHandler,
}
