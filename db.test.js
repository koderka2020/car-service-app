
// // const mongoose = require('mongoose');
// const {MongoClient} = require('mongodb');

// require('dotenv').config();

// // const dbHandler = require('./db.handler');
// const client = require('../server/controller');
// // const clientModel = require('../server/model');


// describe('Client test suite', () => {
//   //Client example.
//   const newClient = {
//     name: 'name',
//     email: 'email',
//   };

//   let connection;
//   let db;
//  //Connect to a new (in-memory) database before running any tests.
// beforeAll(async () => {
//   connection = await MongoClient.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//   });
//   db = await connection.db("nielsen-car-service");
// });

// /**
//  * Clear all test data after every test.
//  */
// // afterEach(async () => await MongoClient.clearDatabase());

// /**
//  * Remove and close the db and server.
//  */
//  afterAll(async () => {
//   await connection.close();
//   await db.close();
// });

// //Tests that a valid client record can be created through the productService without throwing any errors.
//   it('can be created correctly', async () => {
//     const clients = db.collection('client')
//       expect(async () => await clients.insertOne(newClient))
//           .not
//           .toThrow();
//   });
// });
