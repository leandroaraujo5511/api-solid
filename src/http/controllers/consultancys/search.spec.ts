import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Consultancy (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to search consultancy to code', async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/consultancy')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'M3D1C',
        name: 'Medical',
        domain: '@medical.com.br',
        pathLogo: './logo.png',
      })

    const response = await request(app.server)
      .get('/consultancy/search')
      .query({
        q: 'M3D1C',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.consultancy).toEqual(
      expect.objectContaining({
        name: 'Medical',
      }),
    )
  })
})
