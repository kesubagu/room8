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
          authorization: Joi.string().alphanum().required()
        }).options({ allowUnknown: true }),
        payload: {
          roomName: Joi.string().alphanum().required(),
          roomCode: Joi.string().required(),
          address: Joi.string().optional()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/room/resident',
    handler: room.putResident,
    config: {
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).options({ allowUnknown: true }),
        payload: {
          roomName: Joi.string().alphanum().required(),
          roomCode: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/room/resident',
    handler: room.deleteRoomate,
    config: {
      validate: {
        headers: Joi.object({
          authorization: Joi.string().alphanum().required()
        }).options({ allowUnknown: true }),
        payload: {
          roomName: Joi.string().alphanum().required(),
          roomCode: Joi.string().required(),
          residentId: Joi.string().alphanum().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/room/{roomId}',
    handler: room.getRoom,
    config: {
      validate: {
        headers: Joi.object({
          authorization: Joi.string().alphanum().required()
        }).options({ allowUnknown: true }),
        params: {
          roomId: Joi.string().alphanum().required()
        }
      }
    }
  }
];

module.exports = routes;
