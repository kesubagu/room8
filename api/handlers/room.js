const Boom = require('Boom');
const bcrypt = require('bcrypt');
const Room = require('../../models/Room');
const User = require('../../models/User');

module.exports = {
  register: function (request, reply) {
    User.findById(request.headers.authorization)
    .then(function (user) {
      if (!user) {
        return reply(Boom.create(401, 'Missing permissions'))
      }
      let newRoom = new Room({
        RoomName: request.payload.roomName,
        RoomCode: request.payload.roomCode,
        address: request.payload.address || '',
        residentIds: [request.headers.authorization]
      });
      return newRoom.save();
    })
    .then(function (result) {
      return reply(result);
    })
    .catch(function (err) {
      return reply(Boom.wrap(err));
    })
  }
}
