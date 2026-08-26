import { type NextFunction, type Request, type Response } from 'express'
import { getDashboardStats } from '../services/dashboard.service.ts'

const dashboardController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getDashboardStats()

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'dashboard data not found',
      })
    }

    return res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}

export default dashboardController
