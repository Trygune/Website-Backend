import Skill, { type ISkill } from '../models/Skill.ts'

type SkillQuery = {
  featured?: boolean
  category?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export const getSkills = (query: SkillQuery) => {
  return Skill.find(query)
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
