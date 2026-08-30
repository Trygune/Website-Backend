import jwt from 'jsonwebtoken'

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
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  )
}
