const request = require('supertest')
const app = require('../app')

describe('Short.est api test', () => {

    let originalUrl = 'https://indicina.co'
    let testUrlObject = null

    describe('Encode Url Endpoints /encode', () => {

        it('should throw an exception for invalid request', async () => {
            const res = await request(app)
                .post('/encode')
                .send({})

            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('error')
            expect(res.body).toHaveProperty('success')
            expect(res.body.success).toEqual(false)
        })

        it('should return 422 status code for invalid url supplied', async () => {
            const res = await request(app)
                .post('/encode')
                .send({
                    "url": "indicina"
                })

            expect(res.statusCode).toEqual(422)
            expect(res.body).toHaveProperty('error')
            expect(res.body).toHaveProperty('success')
            expect(res.body.success).toEqual(false)
        })

        it('should encode and create a new url', async () => {
            const res = await request(app)
                .post('/encode')
                .send({
                    "url": originalUrl
                })

            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('data')
            expect(res.body).toHaveProperty('success')
            expect(res.body.success).toEqual(true)
            expect(res.body.data).toHaveProperty('originalUrl', originalUrl);
            expect(res.body.data).toHaveProperty('shortUrl');

            //set shortUrl
            testUrlObject = res.body.data
        })
    })

    describe('Decode Url Endpoints /decode', () => {

        it('should return 400 status code for invalid request', async () => {
            const res = await request(app)
                .post('/decode')
                .send({})

            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('error')
            expect(res.body).toHaveProperty('success')
            expect(res.body.success).toEqual(false)
        })

        it('should return 422 status code for invalid url supplied', async () => {
            const res = await request(app)
                .post('/decode')
                .send({
                    "url": "5666jgjhgjh.c"
                })

            expect(res.statusCode).toEqual(422)
            expect(res.body).toHaveProperty('error')
            expect(res.body).toHaveProperty('success')
            expect(res.body.success).toEqual(false)
        })

        it('should decode url', async () => {
            const res = await request(app)
                .post('/decode')
                .send({
                    "url": testUrlObject.shortUrl
                })

            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('data')
            expect(res.body).toHaveProperty('success')
            expect(res.body.success).toEqual(true)
            expect(res.body.data).toHaveProperty('originalUrl', originalUrl);
        })
    })

    describe('Statistics for Url Endpoint /statistic/:urlPath', () => {

        it('should throw an exception for invalid path supplied', async () => {
            const res = await request(app)
                .get('/statistic/XYZAn')

            expect(res.statusCode).toEqual(500)

            expect(res.body).toHaveProperty('error')
            expect(res.body).toHaveProperty('success')
            expect(res.body.success).toEqual(false)
        })

        it('should return stat object', async () => {
            const res = await request(app)
                .get(`/statistic/${testUrlObject.id}`)

            expect(res.statusCode).toEqual(200)

            expect(res.body).toHaveProperty('data')
            expect(res.body).toHaveProperty('success')
            expect(res.body.success).toEqual(true)

            expect(res.body.data).toHaveProperty('originalUrl');
            expect(res.body.data).toHaveProperty('shortUrl');
            expect(res.body.data).toHaveProperty('total');
            expect(res.body.data).toHaveProperty('visitors');
        })
    })
    
})