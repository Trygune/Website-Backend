import type { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'

export interface IProject {
  title: String
  slug: String
  description: String
  fullDescription: String
  technologies: String[]
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
    technologies: [String],
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

const Project = mongoose.model<IProject>('projects', projectSchema)

export default Project
