import type { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'

export interface IProject {
  title: String
  slug: String
  description: String
  fullDescription: String
  overview: String
  features: String[]
  role: String
  year: String
  technologies: String[]
  challengesSolutions: {
    challenge: string
    solution: string
  }[]
  coverImage: String
  githubUrl: String
  liveUrl: String
  featured: String
  status: String
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
    featured: String,
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
