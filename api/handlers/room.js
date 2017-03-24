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
  },
  putResident: function (request, reply) {
    let userInfo = null;
    let roomInfo = null;
    User.findById(request.headers.authorization)
    .then(function (_user) {
      if (!_user) {
        throw Boom.create(401, 'Missing permissions.');
      }
      userInfo = _user;
      return Room.findOne({
        RoomName: request.payload.roomName,
        RoomCode: request.payload.roomCode
      });
    })
    .then(function (room) {
      if (!room) {
        throw Boom.create(404, 'No room with the given name and code')
      }
      if (room.residentIds.indexOf(userInfo._id) !== -1) {
        throw Boom.create(440, 'You have already joined this room');
      }
      room.residentIds.push(userInfo._id);
      return room.save();
    })
    .then(function (result) {
      if (!result) {
        throw Boom.create(441, 'There was an error, try again later');
      }
      roomInfo = result;
      userInfo.roomId.push(roomInfo._id);
      return userInfo.save();
    })
    .then(function (result) {
      if (!result) {
        throw Boom.create(442, 'There was an error, try again later');
      }
      return reply(roomInfo);
    })
    .catch(function (err) {
      return reply(Boom.wrap(err));
    })
  }
}
