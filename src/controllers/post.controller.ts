import { type NextFunction, type Request, type Response } from 'express'
import {
  createPost,
  getPostBySlug,
  getPosts,
  updatePost,
  deletePost,
} from '../services/post.service.ts'

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getPosts()

    return res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    next(error)
  }
}

const getBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getPostBySlug(String(req.params.slug))

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'post not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    next(error)
  }
}

const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await createPost(req.body)

    return res.status(201).json({
      success: true,
      data: post,
    })
  } catch (error) {
    next(error)
  }
}

const patchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await updatePost(req.params.id, req.body)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'post not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await deletePost(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'post not found',
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
