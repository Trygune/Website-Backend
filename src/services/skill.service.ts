import Skill, { type ISkill } from '../models/Skill.ts'

export const getSkills = () => {
  return Skill.find({})
}

export const createSkill = (data: ISkill) => {
  return Skill.create({ ...data })
}

export const updateSkill = (id: string, data: Partial<ISkill>) => {
  return Skill.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true,
  })
}

export const deleteSkill = (id: string) => {
  return Skill.findByIdAndDelete(id)
}
