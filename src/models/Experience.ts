import mongoose, { type HydratedDocument } from 'mongoose'

export interface IExperience {
  id: string
  role: string
  company: string
  type: string
  description: string
  startDate: string
  endDate: string
  current: boolean
  technologies: string[]
  period: string
  responsibilities: string[]
  location: string
  companyUrl: string
  createdAt: Date
  updatedAt: Date
}

export type ExperienceDocument = HydratedDocument<IExperience>

const experienceSchema = new mongoose.Schema<IExperience>(
  {
    role: String,
    company: String,
    type: String,
    description: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    technologies: [String],
    period: String,
    responsibilities: [String],
    location: String,
    companyUrl: String,
  },
  { timestamps: true }
)

experienceSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    const result = ret as unknown as Record<string, unknown>
    delete result._id
    delete result.__v

    return result
  },
})

const Experience = mongoose.model<IExperience>('experiences', experienceSchema)

export default Experience
