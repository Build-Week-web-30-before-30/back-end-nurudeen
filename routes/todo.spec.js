const request = require('supertest')
const router = require('../api/server')
const db = require('../database/db-config')

beforeAll(async () => {
  await db('users').truncate()
})

describe('todos tests', () => {
  describe('[POST] /api/board/board_id/todo endpoint', () => {
    test('the db env is testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    test('should return 200 OK', async () => {
      const response = await request(router)
        .post('/api/board/1/todo')
        .set('Accept', 'application/json')
        .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZ1c2NoIiwiaWF0IjoxNTc0Mjg2Mzk1LCJleHAiOjE1NzQzNzI3OTV9.FjCykhyfCPNToej91AEvKtxQ1I4go0ZPoyIS9jX-3iA`)
        .send({
          name: 'john', 
          completed: 'false',
          board_id: 1
        })
        .expect('Content-Type', /json/)
        
      expect(response.status).toBe(201)
    })   
    test('should return 200', async () => {
      const response = await request(router)
        .get('/api/board/1/todo')
        .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZ1c2NoIiwiaWF0IjoxNTc0Mjg2Mzk1LCJleHAiOjE1NzQzNzI3OTV9.FjCykhyfCPNToej91AEvKtxQ1I4go0ZPoyIS9jX-3iA`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

      expect(response.status).toBe(200)
    })    
  })
})