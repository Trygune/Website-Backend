import Skill, { type ISkill } from '../models/Skill.ts'
import { parseSort } from '../utils/query.ts'

type SkillQuery = {
  sort?: string
  featured?: boolean
  category?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
}

const SKILL_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'name',
  'category',
  'level',
  'percent',
  'featured',
  'order',
]

export const getSkills = (query: SkillQuery) => {
  const sort = parseSort(query.sort, SKILL_SORT_FIELDS, 'order')
  const { sort: _, ...queries } = query

  return Skill.find(queries).sort(sort)
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
