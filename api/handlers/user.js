const Boom = require('Boom');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const SALT_ROUNDS = 10;
module.exports = {
  register: (request, reply) => {
    let newUser = { email:request.payload.email };
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
    reply(Boom.notImplemented());
  }
}
