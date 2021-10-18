const mongoose = require('mongoose');
// require('dotenv').config();

const Schema = mongoose.Schema;

const MONGO_URI = 'mongodb+srv://koderka2020:'+ process.env.MONGO_PW +'@cluster0.wl6qh.mongodb.net/nielsen-car-service?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'nielsen-car-service',
})
.then(() => console.log('Connected to MongoDB' + mongoose.connection.readyState))// to make sure mongoose is connected to DB-> That code will return the database state. If it returns 1 that means you're connected. If it returns 0 that means you're not connected.
.catch(err => console.log(err));

  const clientSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    appointment: {type: Date, min: Date.now /*, required: true*/},
    active: {type: Boolean, default: true}
  })


  module.exports = mongoose.model('Client', clientSchema);;