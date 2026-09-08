import type { Request, Response } from 'express'

import { createVisit, getVisits } from '../services/analytics.service.ts'

export const trackVisit = async (req: Request, res: Response) => {
  const { visitorId, path } = req.body

  await createVisit({
    visitorId,
    path,
  })

  res.status(201).json({
    success: true,
  })
}

export const getAnalytics = async (req: Request, res: Response) => {
  const data = await getVisits(req.query)

  res.status(200).json({
    success: true,
    data,
  })
}
