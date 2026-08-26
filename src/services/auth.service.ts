import jwt from 'jsonwebtoken'
import type { UserDocument } from '../models/User.ts'

export const generateToken = (user: UserDocument) => {
  const privateKey = process.env.JWT_SECRET
  if (!privateKey) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    privateKey,
    {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  )
}
