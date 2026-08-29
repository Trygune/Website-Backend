import Project, { type IProject } from '../models/Project.ts'

type ProjectQuery = {
  featured?: boolean
  status?: 'draft' | 'published'
  role?: string
  year?: string
  technologies?: string[]
}

export const getProjects = (query: ProjectQuery, technologies?: string[]) => {
  const filter = {
    ...(technologies?.length && {
      technologies: {
        $all: technologies,
      },
    }),
  }
  return Project.find({ ...query, ...filter })
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
