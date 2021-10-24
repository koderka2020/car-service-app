const {MongoClient} = require('mongodb');
const supertest = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');
require('dotenv').config();

const request = supertest(app);
const server = 'http://localhost:3000';

// afterAll(async () => {
//   await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
// });
describe('testing end-poitns', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    db = await connection.db("nielsen-car-service");
  });

  afterAll(async () => {
    // await connection.close();
    await connection.close();
    await db.close();
    await mongoose.close();
  });

//testing POST request
describe('POST/client', ()=> {
  let num = 0;
  const mockObject = {
    name: `name${num++}`,
    email: `email${num++}`,
  }

  describe('receiving correct information', ()=> {
    //should save a new client obj to db
    it('should save new client to mongoDB if information is valid(strings)', async()=> {
      const response = await request.post('/client').send(mockObject)
    })
    //should reposnd with 200 status code
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
        name: 'harry',
        email: 'harry@potter.com'
      }
      ;
      await request.post('/client').send((mockObject));
      const response = await request.get('/client').send()
      // console.log(response.body[0])
      expect(response.body[response.body.length-1].name).toBe('harry');
    })
    })

})


//testing PUT



//testing DELETE

});
