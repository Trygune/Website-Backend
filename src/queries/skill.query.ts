import type { SkillQuery } from '../services/skill.service.ts'

const buildSkillQuery = (query: SkillQuery) => {
  const mongoQuery: Record<string, unknown> = {
    ...(query.featured !== undefined && {
      featured: query.featured,
    }),
    ...(query.level && {
      level: query.level,
    }),
    ...(query.category && {
      category: query.category,
    }),
  }

  if (query.search) {
    mongoQuery.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { category: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { level: { $regex: query.search, $options: 'i' } },
    ]
  }

  return mongoQuery
}

export default buildSkillQuery
