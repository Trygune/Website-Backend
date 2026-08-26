import mongoose, { type HydratedDocument } from 'mongoose'

export interface IUser {
  username: string
  email: string
  password: string
  role: 'ADMIN'
}

export type UserDocument = HydratedDocument<IUser>

export const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN'], default: 'ADMIN' },
})

const User = mongoose.model<IUser>('users', userSchema)

export default User
