import { type NextFunction, type Request, type Response } from 'express'
import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from '../services/experience.service.ts'

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getExperiences(req.query)

    return res.status(200).json({
      success: true,
      data: result.experiences,
      pagination: result.pagination,
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
    const experience = await updateExperience(req.params.id as string, req.body)

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
    const experience = await deleteExperience(req.params.id as string)

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
