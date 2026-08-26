import Project, { type IProject } from '../models/Project.ts'

export const getProjects = () => {
  return Project.find({})
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
