import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app.ts'

describe('App', () => {
  it('GET / should return backend status', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      message: 'Backend is running',
    })
  })
})
