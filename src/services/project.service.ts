import Project, { type IProject } from '../models/Project.ts'
import {
  getArrayQuery,
  getPagination,
  getPaginationMeta,
  parseSort,
} from '../utils/query.ts'

type ProjectQuery = {
  page?: number
  limit?: number
  sort?: string
  featured?: boolean
  status?: 'draft' | 'published'
  role?: string
  year?: string
  technologies?: string
}

const PROJECT_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'title',
  'year',
  'featured',
]

export const getProjects = async (query: ProjectQuery) => {
  const { page, limit, skip } = getPagination(query)
  const technologies = getArrayQuery(query.technologies)
  const sort = parseSort(query.sort, PROJECT_SORT_FIELDS, '-featured -year')

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

  const [projects, total] = await Promise.all([
    Project.find({ ...queries, ...filter })
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Project.countDocuments({ ...queries, ...filter }),
  ])

  return {
    projects,
    pagination: getPaginationMeta({
      page,
      limit,
      total,
    }),
  }
}

export const getProjectBySlug = (slug: string) => {
  return Project.findOne({ slug })
}

export const createProject = (data: IProject) => {
  return Project.create({ ...data })
}

export const updateProject = (id: string, data: Partial<IProject>) => {
  return Project.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true,
  })
}

export const deleteProject = (id: string) => {
  return Project.findByIdAndDelete(id)
}
