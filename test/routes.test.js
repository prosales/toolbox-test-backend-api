import * as chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/index.js'

const { expect } = chai
chai.use(chaiHttp)

describe('API Routes', () => {
  describe('GET /api/files/data', () => {
    it('retornar status code 200', async () => {
      const res = await chai.request(app).get('/api/files/data')
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
    })
  })
})