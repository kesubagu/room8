const mongoose = require('mongoose')

exports.register = (server, options, next) => {
  // Mongoose promise is deprecated, so bluebird instead.
  mongoose.Promise = require('bluebird');
  const expose = {
    db: mongoose.connect('mongodb://localhost:27017/room8')
  }
  server.decorate('request', 'mongo', expose);
  next();
}

exports.register.attributes = {
  name: 'mongoose-connection',
  version: '1.0.0'
};
