import type { PostQuery } from '../services/post.service.ts'
import { escapeRegex, parseArrayQuery } from '../utils/query.ts'

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
    const search = escapeRegex(query.search)
    mongoQuery.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { readTime: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ]
  }

  return mongoQuery
}

export default buildPostQuery
