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
// // parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
 app.use('/', express.static(path.resolve(__dirname, '../build')));
 app.use('/static', express.static(path.resolve(__dirname, '../src')));

/**
 * define route handlers
 */
app.use('/client', router);

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  res.status(404).send('This is not the page you\'re looking for...');
});

// global error handler
app.use((err, req, res, next) => {
  console.log('Error', err);
  return res.status(500).json(err);
})

/**
 * start server
 */
app.listen(PORT, ()=> console.log(`Server listening on Port ${PORT}`));

module.exports = app;
