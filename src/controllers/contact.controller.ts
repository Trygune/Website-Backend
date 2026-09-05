import type { NextFunction, Request, Response } from 'express'
import ContactMessage from '../models/ContactMessage.js'

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, subject, message } = req.body

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    })

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
      data: {
        id: contactMessage.id,
      },
    })
  } catch (error) {
    next(error)
  }
}
