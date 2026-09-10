import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app.ts'
import jwt from 'jsonwebtoken'

describe('Auth', () => {
  it('GET /auth/me should return 401 without authentication', async () => {
    const response = await request(app).get('/api/v1/auth/me')

    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      success: false,
      message: 'Authentication required',
    })
  })

  it('GET /auth/me should return 401 with an expired token', async () => {
    const token = jwt.sign(
      {
        sub: 'test-user-id',
        role: 'ADMIN',
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: -1,
      }
    )

    const response = await request(app)
      .get('/api/v1/auth/me')
      .set('Cookie', [`access_token=${token}`])

    expect(response.status).toBe(401)
  })
})
