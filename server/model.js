const mongoose = require('mongoose');
require('dotenv').config();

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'nielsen-car-service',
})
  .then(() => console.log('Connected to MongoDB' + mongoose.connection.readyState))// to make sure mongoose is connected to DB-> That code will return the database state. If it returns 1 that means you're connected. If it returns 0 that means you're not connected.
  .catch(err => console.log(err));

const clientSchema = new Schema({
  name: {type: String, 
    required: true},
  email: {type: String, 
    required: true,
  },
  appointment: {type: Date, 
    // default: ()=> new Date(),
    // min: Date.now, 
    // max: () => Date.now() + 180*24*60*60*1000, //set limit to 180 days in the future
    default:() => new Date(new Date().getTime() + (Math.random()*180*24*60*60*1000))
  },
  // active: {type: Boolean, 
  //         default: false},
  schedueled: {type: Date, 
    default: Date.now}
}, {
  timestamps: true,
});


module.exports = mongoose.model('Client', clientSchema);