import bcrypt from 'bcrypt'

export const hashPassword = (password: string) => {
  const saltRounds = Number(process.env.SALT_ROUNDS)
  return bcrypt.hash(password, saltRounds)
}

export const validatePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}
