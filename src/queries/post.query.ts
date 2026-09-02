import type { PostQuery } from '../services/post.service.ts'
import { parseArrayQuery } from '../utils/query.ts'

const buildPostQuery = (query: PostQuery) => {
  const tags = parseArrayQuery(query.tags)

  const mongoQuery: Record<string, unknown> = {
    ...(query.category && {
      category: query.category,
    }),
    ...(query.readTime && {
      readTime: query.readTime,
    }),
    ...(query.status && {
      status: query.status,
    }),
    ...(tags?.length && {
      tags: {
        $all: tags,
      },
    }),
  }

  if (query.search) {
    mongoQuery.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { excerpt: { $regex: query.search, $options: 'i' } },
      { content: { $regex: query.search, $options: 'i' } },
      { category: { $regex: query.search, $options: 'i' } },
      { readTime: { $regex: query.search, $options: 'i' } },
      { tags: { $regex: query.search, $options: 'i' } },
    ]
  }

  return mongoQuery
}

export default buildPostQuery
