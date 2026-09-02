import { getPagination, getPaginationMeta } from '../utils/pagination.ts'
import Post, { type IPost } from '../models/Post.ts'
import { parseSort } from '../utils/sort.ts'
import buildPostQuery from '../queries/post.query.ts'

export type PostQuery = {
  page?: number
  limit?: number
  sort?: string
  search?: string
  category?: string
  tags?: string
  readTime?: string
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

export const getPosts = async (query: PostQuery) => {
  const { page, limit, skip } = getPagination(query)
  const sort = parseSort(query.sort, POST_SORT_FIELDS, '-publishedAt')
  const mongoQuery = buildPostQuery(query)

  const [posts, total] = await Promise.all([
    Post.find(mongoQuery).sort(sort).skip(skip).limit(limit),

    Post.countDocuments(mongoQuery),
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
export const getPostById = (id: string) => {
  return Post.findById(id)
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
