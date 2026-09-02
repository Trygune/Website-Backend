import Experience, { type IExperience } from '../models/Experience.ts'
import buildExperienceQuery from '../queries/experience.query.ts'
import { getPagination, getPaginationMeta } from '../utils/pagination.ts'
import { parseSort } from '../utils/sort.ts'

export type ExperienceQuery = {
  page?: number
  limit?: number
  sort?: string
  search?: string
  current?: boolean
  type?: string
  location?: string
  role?: string
  technologies?: string
}

const EXPERIENCE_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'type',
  'role',
  'company',
  'startDate',
  'endDate',
  'period',
  'current',
  'location',
]

export const getExperiences = async (query: ExperienceQuery) => {
  const { page, limit, skip } = getPagination(query)
  const sort = parseSort(query.sort, EXPERIENCE_SORT_FIELDS, '-startDate')
  const mongoQuery = buildExperienceQuery(query)

  const [experiences, total] = await Promise.all([
    Experience.find(mongoQuery).sort(sort).skip(skip).limit(limit),

    Experience.countDocuments(mongoQuery),
  ])

  return {
    experiences,
    pagination: getPaginationMeta({
      page,
      limit,
      total,
    }),
  }
}
export const getExperienceById = (id: string) => {
  return Experience.findById(id)
}

export const createExperience = (data: IExperience) => {
  return Experience.create({ ...data })
}

export const updateExperience = (id: string, data: Partial<IExperience>) => {
  return Experience.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true,
  })
}

export const deleteExperience = (id: string) => {
  return Experience.findByIdAndDelete(id)
}
