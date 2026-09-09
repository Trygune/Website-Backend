import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import logger from '../utils/logger.ts'

type JwtPayload = {
  sub: string
  role: 'ADMIN'
}

const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token

  if (!token) {
    logger.warn('Authentication is required')

    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    })
  }

  const secret = process.env.JWT_SECRET

  if (!secret) {
    logger.error('JWT_SECRET is not defined')

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }

  try {
    const payload = jwt.verify(token, secret, {
      algorithms: ['HS256'],
    }) as JwtPayload

    req.user = {
      id: payload.sub,
      role: payload.role,
    }

    next()
  } catch (error) {
    next(error)
  }
}

export default protect
