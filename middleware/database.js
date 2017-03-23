const mongoose = require('mongoose');

const database = mongoose.createConnection('mongodb://localhost:27017/room8');
database.Promise = require('bluebird');

database.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

database.on('open', function () {
  console.log('database connection OK');
});

module.exports = database;
