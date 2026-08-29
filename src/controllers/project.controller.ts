import { type NextFunction, type Request, type Response } from 'express'
import {
  createProject,
  getProjectBySlug,
  getProjects,
  updateProject,
  deleteProject,
} from '../services/project.service.ts'

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technologies = req.query.technologies
      ? String(req.query.technologies)
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : undefined
    const projects = await getProjects(req.query, technologies)

    return res.status(200).json({
      success: true,
      data: projects,
    })
  } catch (error) {
    next(error)
  }
}

const getBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await getProjectBySlug(String(req.params.slug))

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await createProject(req.body)

    return res.status(201).json({
      success: true,
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

const patchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await updateProject(req.params.id, req.body)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await deleteProject(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      })
    }

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export default { get, getBySlug, post, patchById, deleteById }
