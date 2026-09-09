import Project, { type IProject } from '../models/Project.ts'
import buildProjectQuery from '../queries/project.query.ts'
import { getPagination, getPaginationMeta } from '../utils/pagination.ts'
import { parseSort } from '../utils/sort.ts'
import { removeImage } from './upload.service.ts'

export type ProjectQuery = {
  page?: number
  limit?: number
  sort?: string
  search?: string
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
  'status',
]

export const getProjects = async (query: ProjectQuery) => {
  const { page, limit, skip } = getPagination(query)
  const sort = parseSort(query.sort, PROJECT_SORT_FIELDS, '-featured -year')
  const mongoQuery = buildProjectQuery(query)

  const [projects, total] = await Promise.all([
    Project.find(mongoQuery).sort(sort).skip(skip).limit(limit),

    Project.countDocuments(mongoQuery),
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

export const getProjectById = (id: string) => {
  return Project.findById(id)
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

export const deleteProject = async (id: string) => {
  const project = await Project.findById(id)

  if (!project) {
    return null
  }

  if (project.coverImage?.publicId) {
    await removeImage(project.coverImage.publicId)
  }

  await Project.findByIdAndDelete(id)

  return project
}
