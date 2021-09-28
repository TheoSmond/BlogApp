const request = require('supertest');
const app = require('../index');
const login = require('../index');
const verifyToken = require('../index');
const jwt = require('jsonwebtoken');

// const secretkey = process.env.USER_KEY;


describe('Test Endpoints 1:', () => {
  it('requête post', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
          username:"QL",
          password:"test1"
      })
    expect(res.statusCode).toEqual(200)
    console.log(res.body)
  })
})

//NE PEUX PAS CRÉE D'ARTICLE SANS LE JWT
describe('Test Endpoints 2:', () => {
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

//PEUT CRÉE UN ARTICLE CAR POSSÈDE L'AUTHORIZATION GRACE AU JWT

describe('Test Endpoints 2:', () => {
  it('requête post', async () => {
    token = login.route("QL","test")
    const res = await request(app)
    .post('/api/articles/posts' ,verifyToken)
    .set({ Authorization:token})
    //.set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiUUwiLCJlbWFpbCI6InF1ZW50aW5sb2ljcEBnbWFpbC5jb20iLCJtZHAiOiJ0ZXN0In0sImlhdCI6MTYzMjczNDU1NH0.FO7uBBVGLvbPSE_cy3Xk8_ryzG8W5v-9t2Z5Cjt0uJI'})
    .send({
        message: 'article crée : normal'
      }
    )
    expect(res.statusCode).toEqual(200)
  }) 
}) 



// function login(username, password) {
//   const resp = request(app)
//     .post('/api/users/login')
//     .send({
//         username,
//         password
//     })
//   return token 
// }