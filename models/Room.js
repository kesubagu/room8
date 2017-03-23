const mongoose = require('mongoose');
const User = require('./User')
const db = require('../middleware/database');

var Schema = mongoose.Schema;

var RoomSchema = new Schema({
  RoomName: { type: 'String', required: true, unique: true },
  RoomCode: { type: 'String', required: true },
  address: 'string',
  residentIds: [{type: Schema.Type.ObjectId, ref: 'User'}]
});

var Room = db.model('Room', 'RoomSchema');

module.exports = Room;
