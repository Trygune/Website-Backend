import type { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'

export interface IProject {
  id: string
  title: string
  slug: string
  description: string
  fullDescription: string
  overview: string
  features: string[]
  role: string
  year: string
  technologies: string[]
  challengesSolutions: {
    challenge: string
    solution: string
  }[]
  coverImage: string
  githubUrl: string
  liveUrl: string
  featured: boolean
  status: string
  createdAt: Date
  updatedAt: Date
}

export type ProjectDocument = HydratedDocument<IProject>

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String },
    slug: { type: String },
    description: { type: String },
    fullDescription: { type: String },
    role: { type: String },
    year: { type: String },
    technologies: [String],
    overview: { type: String },
    features: [String],
    challengesSolutions: [
      {
        challenge: { type: String },
        solution: { type: String },
      },
    ],
    coverImage: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean },
    status: { type: String },
  },
  { timestamps: true }
)

projectSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v

    return ret
  },
})

const Project = mongoose.model<IProject>('projects', projectSchema)

export default Project
