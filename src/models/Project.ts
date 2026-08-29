import type { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'

export interface IProject {
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
    title: String,
    slug: String,
    description: String,
    fullDescription: String,
    role: String,
    year: String,
    technologies: [String],
    overview: String,
    features: [String],
    challengesSolutions: [
      {
        challenge: String,
        solution: String,
      },
    ],
    coverImage: String,
    githubUrl: String,
    liveUrl: String,
    featured: Boolean,
    status: String,
    createdAt: Date,
    updatedAt: Date,
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
