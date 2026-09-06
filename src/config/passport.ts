import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import logger from '../utils/logger.ts'
import User from '../models/User.ts'
import { validatePassword } from '../utils/auth.ts'

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async function verify(
    email: string,
    password: string,
    cb
  ) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return cb(null, false, { message: 'User not found.' })
      }
      const isValid = await validatePassword(password, user.password)
      if (!isValid) {
        return cb(null, false, { message: 'Incorrect password!' })
      }
      return cb(null, user)
    } catch (error) {
      logger.error(error)
      return cb(error, undefined)
    }
  })
)
