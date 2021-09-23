const request = require('supertest');
const app = require('../index');
const jwt = require('jsonwebtoken');
const secretkey = process.env.USER_KEY;


describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        const: user = {
          username:"QL",
          email:"quentinloicp@gmail.com"
      }
      })
      jwt.sign({user: user}, secretkey, (err, token) => {
        res.json({
            token,
        }); 
    }); 
    expect(res.statusCode).toEqual(200)
    // expect(res.statusCode).toEqual(201)
    // expect(res.body).toHaveProperty('post')
  })
})