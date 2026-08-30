import { getPagination, getPaginationMeta, parseSort } from '../utils/query.ts'
import Post, { type IPost } from '../models/Post.ts'

type PostQuery = {
  page?: number
  limit?: number
  sort?: string
  category?: string
  tags?: string
  status?: 'draft' | 'published'
}

const POST_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'title',
  'category',
  'status',
  'publishedAt',
]

export const getPosts = async (query: PostQuery, tags?: string[]) => {
  const { page, limit, skip } = getPagination(query)

  const sort = parseSort(query.sort, POST_SORT_FIELDS, '-publishedAt')

  const { page: _, limit: __, sort: ___, tags: ____, ...queries } = query

  const filter = {
    ...(tags?.length && {
      tags: {
        $all: tags,
      },
    }),
  }

  const [posts, total] = await Promise.all([
    Post.find({ ...queries, ...filter })
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Post.countDocuments({ ...queries, ...filter }),
  ])

  return {
    posts,
    pagination: getPaginationMeta({
      page,
      limit,
      total,
    }),
  }
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
