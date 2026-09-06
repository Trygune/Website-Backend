import mongoose, { type HydratedDocument } from 'mongoose'

export interface IUser {
  id: string
  username: string
  email: string
  password: string
  resetPasswordToken?: string | null
  resetPasswordExpires?: Date | null
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
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  role: { type: String, enum: ['ADMIN'], default: 'ADMIN' },
})

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    const result = ret as unknown as Record<string, unknown>
    delete result._id
    delete result.__v

    return result
  },
})

const User = mongoose.model<IUser>('users', userSchema)

export default User
