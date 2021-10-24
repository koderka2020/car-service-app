const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

/**
 * require routers
 */
const router = require('./router');


// connect to instance of mongodb atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'nielsen-car-service',
})
  .then(() => console.log('Connected to MongoDB' + mongoose.connection.readyState))// to make sure mongoose is connected to DB-> That code will return the database state. If it returns 1 that means you're connected. If it returns 0 that means you're not connected.
  .catch(err => console.log(err));
/**
 * handle parsing request body
 */
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
//to serve the index.html and the bundle.js files to the browser
 app.use('/', express.static(path.resolve(__dirname, '../build')));

 //to serve static files like pics in case we would like to add them to the application
 app.use('/static', express.static(path.resolve(__dirname, '../src')));

/**
 * define route handler
 */
app.use('/client', router);

// catch-all route handler for any requests to an unknown route
app.get('*', (req, res) => {
  res.status(404).send('This is not the page you\'re looking for or don\'t have access to...');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;