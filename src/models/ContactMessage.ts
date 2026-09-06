import mongoose, { Schema } from 'mongoose'

export interface IContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

contactMessageSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    const result = ret as unknown as Record<string, unknown>
    delete result._id
    delete result.__v

    return result
  },
})

const ContactMessage = mongoose.model<IContactMessage>(
  'ContactMessages',
  contactMessageSchema
)

export default ContactMessage
