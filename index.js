const Hapi = require('hapi');
const mongojs = require('mongojs');
const user = require('./api/routes/userRoutes');

const server = new Hapi.Server();

server.connection({
  port:3000,
  host: 'localhost'
});

server.app.db = mongojs('http://localhost:27017', ['users', 'rooms']);

server.route(user)
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`)
})
