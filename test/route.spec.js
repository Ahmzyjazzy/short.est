const request = require('supertest')
const app = require('../app')

describe('Post Endpoints', () => {
    it('should load application index', async () => {
        const res = await request(app)
            .get('/')
        
        expect(res.statusCode).toEqual(200)
    })
})