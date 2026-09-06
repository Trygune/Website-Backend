import type { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'

export interface ISkill {
  id: string
  name: string
  category: string
  icon: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  percent: number
  description: string
  featured: boolean
  order: number
}

export type SkillDocument = HydratedDocument<ISkill>

const skillSchema = new mongoose.Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },

    percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    icon: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

skillSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    const result = ret as unknown as Record<string, unknown>
    delete result._id
    delete result.__v

    return result
  },
})

const Skill = mongoose.model<ISkill>('skills', skillSchema)

export default Skill
