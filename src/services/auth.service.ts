import jwt, { type SignOptions } from 'jsonwebtoken'
import crypto from 'node:crypto'

export const generateToken = (user: Express.User) => {
  const privateKey = process.env.JWT_SECRET
  if (!privateKey) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(
    {
      sub: user.id.toString(),
      role: user.role,
    },
    privateKey,
    {
      expiresIn:
        (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '7d',
    }
  )
}

export const hashResetToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex')
}
