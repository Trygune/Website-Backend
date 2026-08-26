import { type NextFunction, type Request, type Response } from 'express'
import User from '../models/User.ts'
import passport from 'passport'
import { generateToken } from '../services/auth.service.ts'

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    {
      session: false,
    },
    (
      error: unknown,
      user: Express.User | false,
      info?: { message?: string }
    ) => {
      if (error) {
        return next(error)
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || 'Invalid email or password',
        })
      }

      const token = generateToken(user)

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      })
    }
  )(req, res, next)
}

const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  })
}

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  login,
  logout,
  getMe,
}
