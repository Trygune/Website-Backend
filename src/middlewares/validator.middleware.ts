import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }
  next()
}

export default validator
