import type { NextFunction, Request, Response } from 'express'
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages,
  updateContactMessage,
} from '../services/contact.service.ts'

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getContactMessages()

    return res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contactMessage = await createContactMessage(req.body)

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

const patchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contactMessage = await updateContactMessage(
      req.params.id as string,
      req.body
    )

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: contactMessage,
    })
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contactMessage = await deleteContactMessage(req.params.id as string)

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      })
    }

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export default { get, post, patchById, deleteById }
