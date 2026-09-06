import ContactMessage, {
  type IContactMessage,
} from '../models/ContactMessage.ts'

export type ContactMessageQuery = {
  page?: number
  limit?: number
  sort?: string
  search?: string
  category?: string
  tags?: string
  readTime?: string
  status?: 'draft' | 'published'
}

export const getContactMessages = () => {
  return ContactMessage.find({}).sort('-createdAt')
}

export const createContactMessage = (data: IContactMessage) => {
  const { name, email, subject, message } = data

  return ContactMessage.create({
    name,
    email,
    subject,
    message,
  })
}

export const updateContactMessage = (
  id: string,
  data: Partial<IContactMessage>
) => {
  return ContactMessage.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true,
  })
}

export const deleteContactMessage = (id: string) => {
  return ContactMessage.findByIdAndDelete(id)
}
