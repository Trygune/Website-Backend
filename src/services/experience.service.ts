import { getPagination, getPaginationMeta, parseSort } from '../utils/query.ts'
import Experience, { type IExperience } from '../models/Experience.ts'

type ExperienceQuery = {
  page?: number
  limit?: number
  sort?: string
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

export const getExperiences = async (
  query: ExperienceQuery,
  technologies?: string[]
) => {
  const { page, limit, skip } = getPagination(query)

  const sort = parseSort(query.sort, EXPERIENCE_SORT_FIELDS, '-startDate')

  const {
    page: _,
    limit: __,
    sort: ___,
    technologies: ____,
    ...queries
  } = query

  const filter = {
    ...(technologies?.length && {
      technologies: {
        $all: technologies,
      },
    }),
  }

  const [experiences, total] = await Promise.all([
    Experience.find({ ...queries, ...filter })
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Experience.countDocuments({ ...queries, ...filter }),
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
