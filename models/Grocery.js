const mongoose = require('mongoose');
const Room = require('./Room')
const db = require('../middleware/database');

var Schema = mongoose.Schema;

var GrocerySchema = new Schema({
  items: [
    {
      name: {
        type: 'String',
        required: true
      },
      putBy: {
        type: Schema.Types.ObjectId,
        required: true
      },
      boughtBy: {
        type: Schema.Types.ObjectId,
        default: null
      }
    }
  ],
  roomId: {type: Schema.Types.ObjectId, ref: 'Room'}
});

var Grocery = db.model('Grocery', GrocerySchema);

module.exports = Grocery;
