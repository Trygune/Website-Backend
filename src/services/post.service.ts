import Post, { type IPost } from '../models/Post.ts'

type PostQuery = {
  category?: string
  tags?: string[]
  status?: 'draft' | 'published'
}

export const getPosts = (query: PostQuery, tags?: string[]) => {
  const filter = {
    ...(tags?.length && {
      tags: {
        $all: tags,
      },
    }),
  }

  return Post.find({ ...query, ...filter })
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
