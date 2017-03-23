const Boom = require('Boom');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const SALT_ROUNDS = 10;
module.exports = {
  register: (request, reply) => {
    let newUser = { email:request.payload.name };
    User.findOne({'username': request.payload.username})
    .then(function (result) {
      if (result) {
        throw Boom.create(450, 'Username is taken.');
      }
      newUser.username = request.payload.username;
      return bcrypt.hash(request.payload.password, SALT_ROUNDS);
    })
    .then(function (hashedPswd) {
      newUser.password = hashedPswd;
      return User.create(newUser);
    })
    .then(function (result) {
      return reply(result);
    })
    .catch(function (err) {
      return reply(Boom.wrap(err));
    })
  },

  login: (request, reply) => {
    let UserInfo = null;
    User.findOne({'username': request.payload.username})
    .then(function (result) {
      if (!result) {
        throw Boom.create(404, 'User does not exist.');
      }
      UserInfo = result;
      return bcrypt.compare(request.payload.password, result.password)
    })
    .then(function (passwordMatch) {
      if (!passwordMatch) {
        throw Boom.create(401, 'Password or username is wrong.');
      }
      return reply(UserInfo);
    })
    .catch(function (err) {
      return reply(Boom.wrap(err));
    })
  }
}
