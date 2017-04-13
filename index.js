const Hapi = require('hapi');
const mongojs = require('mongojs');
const fs = require('fs');
const user = require('./api/routes/userRoutes');
const room = require('./api/routes/roomRoutes');
const grocery = require('./api/routes/groceryRoutes');

const tls =  {
  key: fs.readFileSync('./conf/cert/key.pem'),
  cert: fs.readFileSync('./conf/cert/cert.pem')
}

const server = new Hapi.Server();

server.connection({
  port: 3000,
  host: '0.0.0.0',
//  tls: tls
});

server.route(user);
server.route(room);
server.route(grocery);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`)
});

module.exports = server;
