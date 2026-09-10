import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '../src/app.ts'

vi.mock('../src/services/post.service.ts', () => ({
  getPosts: vi.fn(),
  getPostBySlug: vi.fn(),
  getPostById: vi.fn(),
  createPost: vi.fn(),
  updatePost: vi.fn(),
  deletePost: vi.fn(),
}))

import { getPosts, getPostBySlug } from '../src/services/post.service.ts'

describe('Posts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET /posts should return posts', async () => {
    vi.mocked(getPosts).mockResolvedValue({
      posts: [
        {
          _id: 'post-1',
          title: 'Test Post',
          slug: 'test-post',
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    } as any)

    const response = await request(app).get('/api/v1/posts')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toHaveLength(1)
    expect(response.body.data[0].slug).toBe('test-post')
    expect(response.body.pagination).toBeDefined()

    expect(getPosts).toHaveBeenCalledOnce()
  })

  it('GET /posts/:slug should return a post', async () => {
    vi.mocked(getPostBySlug).mockResolvedValue({
      _id: 'post-1',
      title: 'Test Post',
      slug: 'test-post',
    } as any)

    const response = await request(app).get('/api/v1/posts/test-post')

    expect(response.status).toBe(200)

    expect(response.body).toEqual({
      success: true,
      data: {
        _id: 'post-1',
        title: 'Test Post',
        slug: 'test-post',
      },
    })

    expect(getPostBySlug).toHaveBeenCalledWith('test-post')
  })

  it('GET /posts/:slug should return 404 when post does not exist', async () => {
    vi.mocked(getPostBySlug).mockResolvedValue(null)

    const response = await request(app).get('/api/v1/posts/not-found')

    expect(response.status).toBe(404)

    expect(response.body).toEqual({
      success: false,
      message: 'post not found',
    })

    expect(getPostBySlug).toHaveBeenCalledWith('not-found')
  })
})
