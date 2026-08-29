import { type NextFunction, type Request, type Response } from 'express'
import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from '../services/experience.service.ts'

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technologies = req.query.technologies
      ? String(req.query.technologies)
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : undefined
    const experience = await getExperiences(req.query, technologies)

    return res.status(200).json({
      success: true,
      data: experience,
    })
  } catch (error) {
    next(error)
  }
}

const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await createExperience(req.body)

    return res.status(201).json({
      success: true,
      data: experience,
    })
  } catch (error) {
    next(error)
  }
}

const patchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await updateExperience(req.params.id, req.body)

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'experience not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: experience,
    })
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await deleteExperience(req.params.id)

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'experience not found',
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
