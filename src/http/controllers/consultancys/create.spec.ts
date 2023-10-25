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
  it('should be able to create a consultancy', async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/consultancy')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Medical',
        code: 'M3D1C',
        domain: '@medical.com.br',
        pathLogo: '',
      })

    expect(response.statusCode).toEqual(201)
  })
})
