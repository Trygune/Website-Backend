import mongoose, { type HydratedDocument } from 'mongoose'

export interface IUser {
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
    delete ret._id
    delete ret.__v

    return ret
  },
})

const User = mongoose.model<IUser>('users', userSchema)

export default User
