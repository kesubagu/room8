const Hapi = require('hapi');
const server = new Hapi.Server();
const user = require('./api/routes/userRoutes');

server.connection({
  port:3000,
  host: 'localhost'
})

server.route(user)
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`)
})
