import Post, { type IPost } from '../models/Post.ts'

export const getPosts = () => {
  return Post.find({})
}

export const getPostBySlug = (slug: string) => {
  return Post.findOne({ slug })
}

export const createPost = (data: IPost) => {
  return Post.create({ ...data })
}

export const updatePost = (id: string, data: Partial<IPost>) => {
  return Post.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true,
  })
}

export const deletePost = (id: string) => {
  return Post.findByIdAndDelete(id)
}
