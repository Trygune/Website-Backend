import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '../src/app.ts'

vi.mock('../src/services/project.service.ts', () => ({
  getProjects: vi.fn(),
  getProjectBySlug: vi.fn(),
  getProjectById: vi.fn(),
  createProject: vi.fn(),
  updateProject: vi.fn(),
  deleteProject: vi.fn(),
}))

import {
  getProjects,
  getProjectBySlug,
} from '../src/services/project.service.ts'

describe('Projects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET /projects should return projects', async () => {
    vi.mocked(getProjects).mockResolvedValue({
      projects: [
        {
          _id: 'project-1',
          title: 'Test Project',
          slug: 'test-project',
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    } as any)

    const response = await request(app).get('/api/v1/projects')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toHaveLength(1)
    expect(response.body.data[0].slug).toBe('test-project')
    expect(response.body.pagination).toBeDefined()

    expect(getProjects).toHaveBeenCalledOnce()
  })

  it('GET /projects/:slug should return a project', async () => {
    vi.mocked(getProjectBySlug).mockResolvedValue({
      _id: 'project-1',
      title: 'Test Project',
      slug: 'test-project',
    } as any)

    const response = await request(app).get('/api/v1/projects/test-project')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      data: {
        _id: 'project-1',
        title: 'Test Project',
        slug: 'test-project',
      },
    })

    expect(getProjectBySlug).toHaveBeenCalledWith('test-project')
  })

  it('GET /projects/:slug should return 404 when project does not exist', async () => {
    vi.mocked(getProjectBySlug).mockResolvedValue(null)

    const response = await request(app).get('/api/v1/projects/not-found')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      success: false,
      message: 'Project not found',
    })

    expect(getProjectBySlug).toHaveBeenCalledWith('not-found')
  })
})
