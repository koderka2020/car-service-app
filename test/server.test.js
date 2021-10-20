const supertest = require('supertest');
const app = require('../server/server');
const mongoose = require('mongoose');
const { TestWatcher } = require('@jest/core');
// const { TestWatcher } = require('@jest/core');
const request = supertest(app);
const server = 'http://localhost:3000';

//simple test to test testing environment config:
// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//      expect(true).toBe(true)
//   })
// })


describe('POST/client', ()=> {

  const mockObject = {
    name: 'name',
    email: 'email'
  }

  describe('receiving correct information', ()=> {
    //should save a new client obj to db
    xtest('should save new client to mongoDB if information is valid(strings)', async()=> {
      const response = await request.post('/client').send(mockObject)
    })
    //should reposnd with 200 status code
    xtest('should respond with 200 status code', async ()=> {
      const response = await request.post('/client').send(mockObject)
      expect(response.statusCode).toBe(200)
    })
    //should specify json in the content type header
    xtest('response should specify json in in the content-type header', async ()=> {
      const response = await request.post('/client').send(mockObject)
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    //response obj has appointment 
    xtest('response obj has default/dynamicaly ctreated property appointment from Schema', async()=> {
      const response = await request.post('/client').send(mockObject)
      expect(response.body.appointment).toBeDefined()
    })
    })

  describe('missing information to create new user', ()=> {
    //should respond with 404 code
    xtest('should respond with 404 status code', async ()=> {
      const testingData = [{}, {name: "name"}, {email: "email"}];
      for (const mock of testingData) {
        const response = await request.post('/').send(mock)
        expect(response.statusCode).toBe(404)
      }
    })
  })
})

afterAll(() => { 
  mongoose.connection.close()
})


//testing GET



//testing PUT



//testing DELETE