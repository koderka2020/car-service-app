const app = require('./app');



// whenever we use process.env we can use variables in that config. if not there then we use port 3000
const PORT = process.env.PORT || 3000;

/**
 * start server
 */
app.listen(PORT, ()=> console.log(`Server listening on Port ${PORT}`));


