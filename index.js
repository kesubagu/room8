const Hapi = require('hapi');
const mongojs = require('mongojs');
const user = require('./api/routes/userRoutes');

const server = new Hapi.Server();

server.connection({
  port: 3000,
  host: 'localhost'
});
server.register([
  {
    register: require('./plugins/mongodb'),
  }
], function (err) {
  if (err) {
    throw err
  }
  server.route(user)
  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log(`Server running at: ${server.info.uri}`)
  })
})

module.exports = server;
