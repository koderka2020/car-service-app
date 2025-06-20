
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const clientSchema = new Schema({
  name: {type: String, 
    required: true},
  email: {type: String, 
    required: true,
  },
  reason: {type: String, 
    required: true,
  },
  appointment: {type: Date, 
    default:() => new Date(new Date().getTime() + (Math.random()*180*24*60*60*1000))
  },
  schedueled: {type: Date, 
    default: Date.now}
}, {
  timestamps: true,
});


module.exports = mongoose.model('Client', clientSchema);
