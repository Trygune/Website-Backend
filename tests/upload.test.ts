import jwt from 'jsonwebtoken'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '../src/app.ts'

vi.mock('../src/services/upload.service.ts', () => ({
  processAndSaveImage: vi.fn(),
  removeImage: vi.fn(),
}))

import { processAndSaveImage } from '../src/services/upload.service.ts'

const createAuthToken = () => {
  return jwt.sign(
    {
      sub: 'test-user-id',
      role: 'ADMIN',
    },
    process.env.JWT_SECRET!
  )
}

describe('Upload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('POST /uploads/image should return 401 without authentication', async () => {
    const response = await request(app)
      .post('/api/v1/uploads/image')
      .attach('coverImage', Buffer.from('fake image'), 'test.jpg')

    expect(response.status).toBe(401)

    expect(response.body).toEqual({
      success: false,
      message: 'Authentication required',
    })
  })

  it('POST /uploads/image should return 400 when image is missing', async () => {
    const token = createAuthToken()

    const response = await request(app)
      .post('/api/v1/uploads/image')
      .set('Cookie', `access_token=${token}`)

    expect(response.status).toBe(400)

    expect(response.body).toEqual({
      success: false,
      message: 'Image is required',
    })

    expect(processAndSaveImage).not.toHaveBeenCalled()
  })

  it('POST /uploads/image should upload an image successfully', async () => {
    const token = createAuthToken()

    vi.mocked(processAndSaveImage).mockResolvedValue({
      url: 'https://res.cloudinary.com/test/image/upload/test.webp',
      publicId: 'uploads/images/projects/test-id',
    })

    const response = await request(app)
      .post('/api/v1/uploads/image?for=projects')
      .set('Cookie', `access_token=${token}`)
      .attach('coverImage', Buffer.from('fake image'), 'test.jpg')

    expect(response.status).toBe(201)

    expect(response.body).toEqual({
      success: true,
      data: {
        url: 'https://res.cloudinary.com/test/image/upload/test.webp',
        publicId: 'uploads/images/projects/test-id',
      },
    })

    expect(processAndSaveImage).toHaveBeenCalledOnce()
  })
})
