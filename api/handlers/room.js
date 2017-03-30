const Boom = require('Boom');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Room = require('../../models/Room');
const Grocery = require('../../models/Grocery');
const User = require('../../models/User');

module.exports = {
  register: function (request, reply) {
    let roomInfo = null;
    let userInfo = null;
    User.findById(request.headers.authorization)
    .then(function (user) {
      if (!user) {
        throw Boom.create(401, 'Missing permissions')
      }
      userInfo = user;
      let newRoom = new Room({
        RoomName: request.payload.roomName,
        RoomCode: request.payload.roomCode,
        address: request.payload.address || '',
        residentIds: [request.headers.authorization]
      });
      let newGroceryList = new Grocery({
        items: [],
        roomId: newRoom._id
      });
      newRoom.groceryListId = newGroceryList._id;
      return Promise.all([newRoom.save(), newGroceryList.save()]);
    })
    .then(function (result) {
      if (!result) {
        throw Boom.create(441, 'There was a problem try again later')
      }
      result = result[0];
      roomInfo = result;
      userInfo.roomId.push(roomInfo._id);
      return userInfo.save();
    })
    .then(function (result) {
      if (!result) {
        throw Boom.create(442, 'There was a problem try again later')
      }
      return reply(roomInfo);
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
        throw Boom.create(443, 'There was an error, try again later');
      }
      roomInfo = result;
      userInfo.roomId.push(roomInfo._id);
      return userInfo.save();
    })
    .then(function (result) {
      if (!result) {
        throw Boom.create(444, 'There was an error, try again later');
      }
      return reply(roomInfo);
    })
    .catch(function (err) {
      return reply(Boom.wrap(err));
    })
  },

  deleteRoomate: function (request, reply) {
    let newRoomInfo = null;
    let reqUserInfo = null;
    let delUserInfo = null;

    User.findById(request.headers.authorization)
    .then(function (_user) {
      if (!_user) {
        throw Boom.create(401, 'Missing permissions.');
      }
      reqUserInfo = _user;
      return User.findById(request.payload.residentId);
    })
    .then(function (_userInfo) {
      if (!_userInfo) {
        throw Boom.create(404, 'Could not find that user');
      }
      delUserInfo = _userInfo;
      return Room.findOne({
        RoomName: request.payload.roomName,
        RoomCode: request.payload.roomCode
      });
    })
    .then(function (room) {
      if (!room) {
        throw Boom.create(404, 'No room with the given name and code');
      }
      let resArray = room.residentIds.map(function (res) {return res.toString()})
      if (resArray.indexOf(request.payload.residentId) === -1) {
        throw Boom.create(404, 'User is not a resident of this room');
      }

      room.residentIds.pop(delUserInfo._id);
      return room.save();
    })
    .then(function (result) {
      if (!result) {
        throw Boom.create(445, 'There was an error, try again later.')
      }
      newRoomInfo = result;
      delUserInfo.roomId.pop(newRoomInfo._id);
      return delUserInfo.save();
    })
    .then(function (result) {
      if (!result) {
        throw Boom.create(445, 'There was an error, try again later.')
      }
      return reply(newRoomInfo);
    })
    .catch(function (err) {
      return reply(Boom.wrap(err));
    })
  }
}
