import request from 'supertest'
import app  from '../src/app'
import prisma from '../lib/prismaClientSingleton'


afterAll(async () => {
  await prisma.$disconnect()
})

const user = {
name: 'user 1',
    email: 'user1@a.com',
  }

test('a user is added successfully', async () => {
    const response = await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBeDefined()
  })