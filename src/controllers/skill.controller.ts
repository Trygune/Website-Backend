import { type NextFunction, type Request, type Response } from 'express'
import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from '../services/skill.service.ts'

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await getSkills()

    return res.status(200).json({
      success: true,
      data: skill,
    })
  } catch (error) {
    next(error)
  }
}

const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await createSkill(req.body)

    return res.status(201).json({
      success: true,
      data: skill,
    })
  } catch (error) {
    next(error)
  }
}

const patchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await updateSkill(req.params.id, req.body)

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'skill not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: skill,
    })
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await deleteSkill(req.params.id)

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'skill not found',
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
