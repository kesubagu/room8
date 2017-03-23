const Joi = require('Joi');
const room = require('../handlers/room');

let routes = [
  {
    method: 'POST',
    path: '/room/register',
    handler: room.register,
    config: {
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).options({ allowUnknown: true }),
        payload: {
          roomName: Joi.string().required(),
          roomCode: Joi.string().required(),
          address: Joi.string().optional()
        }
      }
    }
  }
];

module.exports = routes;
