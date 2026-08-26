import mongoose, { type HydratedDocument } from 'mongoose'

export interface IExperience {
  role: String
  company: String
  type: String
  description: String
  startDate: String
  endDate: String
  current: Boolean
  technologies: String[]
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
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
)

const Experience = mongoose.model<IExperience>('experiences', experienceSchema)

export default Experience
