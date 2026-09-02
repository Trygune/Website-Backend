import type { ProjectQuery } from '../services/project.service.ts'
import { parseArrayQuery } from '../utils/query.ts'

const buildProjectQuery = (query: ProjectQuery) => {
  const technologies = parseArrayQuery(query.technologies)

  const mongoQuery: Record<string, unknown> = {
    ...(query.featured !== undefined && {
      featured: query.featured,
    }),
    ...(query.role && {
      role: query.role,
    }),
    ...(query.year && {
      year: query.year,
    }),
    ...(query.status && {
      status: query.status,
    }),
    ...(technologies?.length && {
      technologies: {
        $all: technologies,
      },
    }),
  }

  if (query.search) {
    mongoQuery.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { fullDescription: { $regex: query.search, $options: 'i' } },
      { features: { $regex: query.search, $options: 'i' } },
      { overview: { $regex: query.search, $options: 'i' } },
      { role: { $regex: query.search, $options: 'i' } },
      { technologies: { $regex: query.search, $options: 'i' } },
    ]
  }

  return mongoQuery
}

export default buildProjectQuery
