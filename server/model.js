
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
