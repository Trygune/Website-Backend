import { type NextFunction, type Request, type Response } from 'express'
import User from '../models/User.ts'
import passport from 'passport'
import crypto from 'node:crypto'
import { sendPasswordResetEmail } from '../services/email.service.ts'
import { generateToken, hashResetToken } from '../services/auth.service.ts'
import { hashPassword } from '../utils/auth.ts'

const forgot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          'If an account with that email exists, you will receive a password reset link.',
      })
    }
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = hashResetToken(resetToken)
    const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000)
    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = resetTokenExpires
    await user.save()

    const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`

    await sendPasswordResetEmail(user.email, resetUrl)
    return res.status(200).json({
      success: true,
      message:
        'If an account with that email exists, you will receive a password reset link.',
    })
  } catch (error) {
    next(error)
  }
}

const reset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params
    const { password } = req.body
    const hashedToken = hashResetToken(token as string)
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      })
    }

    user.password = await hashPassword(password)
    user.resetPasswordToken = null
    user.resetPasswordExpires = null

    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    })
  } catch (error) {
    next(error)
  }
}

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
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  })

  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  })
}

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const user = await User.findById(req.user.id).select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
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
  forgot,
  reset,
  login,
  logout,
  getMe,
}
