import type { ExperienceQuery } from '../services/experience.service.ts'
import { parseArrayQuery } from '../utils/query.ts'

const buildExperienceQuery = (query: ExperienceQuery) => {
  const technologies = parseArrayQuery(query.technologies)

  const mongoQuery: Record<string, unknown> = {
    ...(query.current !== undefined && {
      current: query.current,
    }),
    ...(query.type && {
      type: query.type,
    }),
    ...(query.role && {
      role: query.role,
    }),
    ...(query.location && {
      location: query.location,
    }),
    ...(technologies?.length && {
      technologies: {
        $all: technologies,
      },
    }),
  }

  if (query.search) {
    mongoQuery.$or = [
      { role: { $regex: query.search, $options: 'i' } },
      { company: { $regex: query.search, $options: 'i' } },
      { period: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { responsibilities: { $regex: query.search, $options: 'i' } },
      { technologies: { $regex: query.search, $options: 'i' } },
    ]
  }

  return mongoQuery
}

export default buildExperienceQuery
