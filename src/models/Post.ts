import mongoose, { type HydratedDocument } from 'mongoose'

export interface IPost {
  title: String
  slug: String
  excerpt: String
  content: String
  coverImage: String
  category: String
  tags: String[]
  status: String
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export type PostDocument = HydratedDocument<IPost>

const postSchema = new mongoose.Schema<IPost>(
  {
    title: String,
    slug: String,
    excerpt: String,
    content: String,
    coverImage: String,
    category: String,
    tags: [String],
    status: String,
    publishedAt: Date,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
)

const Post = mongoose.model<IPost>('posts', postSchema)

export default Post
