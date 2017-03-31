const Boom = require('Boom');
const mongoose = require('mongoose');
const Grocery = require('../../models/Grocery');
const Room = require('../../models/Room');
const User = require('../../models/User');

module.exports = {
  addGrocery: function (request, reply) {
    let roomInfo = null;
    let userInfo = null;
    let groceryList = null;
    User.findById(request.headers.authorization)
    .then(function (_userInfo) {
      if (!_userInfo) {
        throw Boom.create(401, 'Missing permissions')
      }
      userInfo = _userInfo;
      return Room.findById(request.payload.roomId)
    })
    .then(function (_roomInfo) {
      if (!_roomInfo) {
        throw Boom.create(404, 'Can not find room');
      }
      roomInfo = _roomInfo;
      if (!roomInfo.groceryListId) {
        throw Boom.create(404, 'Can not find your grocery list');
      }
      return Grocery.findById(roomInfo.groceryListId);
    })
    .then(function (groceryList) {
      let item = {
        name: request.payload.name,
        putBy: userInfo._id
      }
      groceryList.items.push(item)
      return groceryList.save();
    })
    .then(function (updatedList) {
      if (!updatedList) {
        throw Boom.create(450, 'There was a problem, try again later.')
      }
      return reply(updatedList);
    })
    .catch(function (err) {
      throw Boom.wrap(err);
    })
  },

  getItem: function (request, reply) {
    let userInfo = null;
    User.findById(request.headers.authorization)
    .then(function (_userInfo) {
      if (!_userInfo) {
        throw Boom.create('Missing permissions')
      }
      userInfo = _userInfo;
      return Grocery.findById(request.params.listId)
    })
    .then(function (glist) {
      glist.items.forEach(function (item) {
        if (item._id.toString() === request.params.itemId) {
          item.boughtBy = request.params.itemId
        }
      });
      return glist.save();
    })
    .then(function (_updatedList) {
      if (!_updatedList) {
        throw Boom.create(450, 'There was a problem, try again later.')
      }
      return reply(_updatedList)
    })
    .catch(function (err) {
      return reply(Boom.wrap(err));
    })
  }
}
