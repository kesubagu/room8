const mongoose = require('mongoose');
const db = require('../middleware/database');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {type: 'String', required: true},
  lastName: {type: 'String', required: true},
  username: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  email: 'String',
  roomId: [{type: Schema.Types.ObjectId, ref: 'Room'}]
});

var User = db.model('User', userSchema);

module.exports = User;
