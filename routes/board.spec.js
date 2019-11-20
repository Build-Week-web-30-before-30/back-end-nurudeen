const request = require('supertest')
const server = require('../api/server.js')

describe('server', () => {
  describe('[GET] /api/board endpoint', () => {
    test('the db env is testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    test('should return 200 OK', async () => {
      const response = await request(server).get('/api/board/')
      expect(response.status).toBe(200)
    })

    test('should return 200 OK with ES6 promise', () => {
      return request(server).get('/api/board/')
        .then(response => {
          expect(response.status).toBe(200)
        })
    })
  })
})
