const Hapi = require('hapi');
const mongojs = require('mongojs');
const user = require('./api/routes/userRoutes');
const room = require('./api/routes/roomRoutes');

const server = new Hapi.Server();

server.connection({
  port: 3000,
  host: 'localhost'
});

server.route(user);
server.route(room);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`)
});

module.exports = server;
