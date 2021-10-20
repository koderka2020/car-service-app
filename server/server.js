const path = require('path');
const express = require('express');
const app = express();


// whenever we use process.env we can use variables in that config. if not there then we use port 3000
const PORT = process.env.PORT || 3000;
/**
 * require routers
 */
const router = require('./router');

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

/**
 * start server
 */
app.listen(PORT, ()=> console.log(`Server listening on Port ${PORT}`));

module.exports = app;
