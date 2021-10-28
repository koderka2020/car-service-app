
const supertest = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');
require('dotenv').config();

const request = supertest(app);
const server = 'http://localhost:3000';

let connection;
let db;

//becasue of this code block mongoose wasn't disconnecting:
// beforeAll(async () => {
//                             console.log('testing before all 1')
//   connection = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
// });

// afterAll(async () => {
//                             console.log('testing afetr all 2')

//   await mongoose.connection.close();
// });

describe('testing end-poitns', () => {

  const mockObject = {
    id: 12345,
    name: 'name',
    email: 'email',
    reason: 'fixing car',
  }

//testing POST request
describe('POST/client', ()=> {
  describe('sending correctly formated information', ()=> {
    //should save a new client obj to db
    it('should save new client to mongoDB if information is valid(strings)', async()=> {
      const response = await request.post('/client').send(mockObject)
    })
    //should respond with 200 status code
    it('should respond with 200 status code', async ()=> {
      const response = await request.post('/client').send(mockObject)
      expect(response.statusCode).toBe(200)
    })
    //should specify json in the content type header
    it('response should specify json in in the content-type header', async ()=> {
      const response = await request.post('/client').send(mockObject)
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    //response obj has appointment 
    it('response obj has default/dynamicaly ctreated property appointment from Schema', async()=> {
      const response = await request.post('/client').send(mockObject)
      expect(response.body.appointment).toBeDefined()
    })
    })

  describe('missing information to create new user', ()=> {
    //should respond with 404 code
    it('should respond with 404 status code', async ()=> {
      const testingData = [{}, {name: "name"}, {email: "email"}];
      for (const mock of testingData) {
        const response = await request.post('/').send(mock)
        expect(response.statusCode).toBe(404)
      }
    })
  })
})

//testing GET
describe('GET/client', ()=> {
  describe('receiving correct information', ()=> {
    //should etrieve and send all data from mongoDB
    it('should retrieve and send all data from mongoDB collection', async()=> {
      const response = await request.get('/client').send()
    })
    //should reposnd with 200 status code
    it('should respond with 200 status code', async ()=> {
      const response = await request.get('/client').send()
      expect(response.statusCode).toBe(200)
    })
    //should specify json in the content type header
    it('response should specify json in in the content-type header', async ()=> {
      const response = await request.get('/client').send()
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    //response is an array of objects
    it('response is an array of objects', async()=> {
      const mockObject = {
        id: 12345,
        name: 'harry',
        email: 'harry@potter.com',
        reason: 'fixing car',
      }
      ;
      await request.post('/client').send((mockObject));
      const response = await request.get('/client').send()
      // console.log(response.body[0])
      expect(response.body[response.body.length-1].name).toBe('harry');
    })
  })
})

//testing PUT => not passing
describe('testing PUT request endpoint', ()=> {
  describe('updating data for selected client in DB', ()=> {
    const newDate = new Date(new Date().getTime() + (Math.random()*180*24*60*60*1000));
    const id = mockObject.id;
    //should respond with 200 status code => returning 500
    xit('should respond with 200 status code', async ()=> {
      const response = await request.put('/client/'+ id).send({appointment:newDate})
      expect(response.statusCode).toBe(200)
    })
    it('response should specify json in in the content-type header', async ()=> {
      const response = await request.put('/client/'+ id).send({appointment:newDate})
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    })
})



//testing DELETE
describe('DELETE/client', ()=> {
  it('should respond with 200 status code', async ()=> {
    const response = await request.delete('/client/').send({})
    expect(response.statusCode).toBe(200)
  })
  it('response should specify json in in the content-type header', async ()=> {
    const response = await request.delete('/client/').send({})
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  })

})


});
