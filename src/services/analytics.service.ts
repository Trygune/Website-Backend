import Visit from '../models/Visit.ts'

export type VisitQuery = {
  range?: number
}

export const getVisits = async (query: VisitQuery) => {
  const range = Number(query.range) || 30

  const allowedRanges = [7, 30, 90]

  const days = allowedRanges.includes(range) ? range : 30

  const startDate = new Date()

  startDate.setDate(startDate.getDate() - days)

  const visits = await Visit.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        visits: {
          $sum: 1,
        },
        uniqueVisitors: {
          $addToSet: '$visitorId',
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        visits: 1,
        uniqueVisitors: {
          $size: '$uniqueVisitors',
        },
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ])

  return visits
}

export const createVisit = async ({
  visitorId,
  path,
}: {
  visitorId: string
  path: string
}) => {
  return Visit.create({
    visitorId,
    path,
  })
}
