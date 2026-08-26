import Experience, { type IExperience } from '../models/Experience.ts'

export const getExperiences = () => {
  return Experience.find({})
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
