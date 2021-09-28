const request = require('supertest');
const app = require('../index');
const verifyToken = require('../index');

let token;

describe('Création un user:', () => {
  it('requête post', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
          username:"QL",
          password:"test1"
      })
    expect(res.statusCode).toEqual(200)
    console.log(res.body)
    token = res.body.token
  })
})

//NE PEUX PAS CRÉE D'ARTICLE SANS LE JWT
describe('Test création article sans authorization:', () => {
  it('requête post', async () => {
    const res = await request(app)
      .post('/api/articles/posts')
      .send({
          message: 'Article non crée : normal',
        }
      )
    expect(res.statusCode).toEqual(403)
  }) 
}) 

describe('Test création article avec authorization:', () => {
  it('requête post', async () => {
    const res = await request(app)
    .post('/api/articles/posts' ,verifyToken)
    .set({ Authorization:`Bearer ${token}`})
    //.set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiUUwiLCJlbWFpbCI6InF1ZW50aW5sb2ljcEBnbWFpbC5jb20iLCJtZHAiOiJ0ZXN0In0sImlhdCI6MTYzMjczNDU1NH0.FO7uBBVGLvbPSE_cy3Xk8_ryzG8W5v-9t2Z5Cjt0uJI'})
    .send({
        message: 'article crée : normal'
      }
    )
    expect(res.statusCode).toEqual(200)
  }) 
}) 

