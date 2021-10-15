const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MONGO_URI = '';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

  const clientSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    appointment: {type: Date, min: Date.now, required: true},
    active: {type: Boolean, default: true}
  })

  const Client = mongoose.model('client', clientSchema);

  module.exports = {Client};