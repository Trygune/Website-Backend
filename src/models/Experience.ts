import mongoose, { type HydratedDocument } from 'mongoose'

export interface IExperience {
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
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
)

experienceSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v

    return ret
  },
})

const Experience = mongoose.model<IExperience>('experiences', experienceSchema)

export default Experience
