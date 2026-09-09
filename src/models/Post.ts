import mongoose, { type HydratedDocument } from 'mongoose'

export interface IPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  readTime: string
  coverImage: {
    url: string
    publicId: string
  }
  category: string
  tags: string[]
  status: string
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
    readTime: String,
    coverImage: {
      url: { type: String },
      publicId: { type: String },
    },
    category: String,
    tags: [String],
    status: String,
    publishedAt: Date,
  },
  { timestamps: true }
)

postSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()

    const result = ret as unknown as Record<string, unknown>

    delete result._id
    delete result.__v

    return result
  },
})

const Post = mongoose.model<IPost>('posts', postSchema)

export default Post
