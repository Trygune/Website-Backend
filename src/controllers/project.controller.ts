import { type NextFunction, type Request, type Response } from 'express'
import {
  createProject,
  getProjectBySlug,
  getProjects,
  updateProject,
  deleteProject,
  getProjectById,
} from '../services/project.service.ts'

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getProjects(req.query)

    return res.status(200).json({
      success: true,
      data: result.projects,
      pagination: result.pagination,
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

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await getProjectById(req.params.id as string)

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
    const data = {
      ...req.body,
      coverImage: req.body.coverImage
        ? JSON.parse(req.body.coverImage)
        : undefined,
    }
    const project = await createProject(data)

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
    const data = {
      ...req.body,
      coverImage: req.body.coverImage
        ? JSON.parse(req.body.coverImage)
        : undefined,
    }
    const project = await updateProject(req.params.id as string, data)

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
    const project = await deleteProject(req.params.id as string)

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

export default { get, getBySlug, getById, post, patchById, deleteById }
