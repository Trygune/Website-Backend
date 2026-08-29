import Experience, { type IExperience } from '../models/Experience.ts'

type ExperienceQuery = {
  current?: boolean
  type?: string
  location?: string
  role?: string
  technologies?: string[]
}

export const getExperiences = (
  query: ExperienceQuery,
  technologies?: string[]
) => {
  const filter = {
    ...(technologies?.length && {
      technologies: {
        $all: technologies,
      },
    }),
  }
  return Experience.find({ ...query, ...filter })
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
