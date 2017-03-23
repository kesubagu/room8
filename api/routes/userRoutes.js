'use strict';

const Joi = require('Joi');
const user = require('../handlers/user');

let routes = [
  {
    method: 'POST',
    path: '/user/register',
    handler: user.register,
    config: {
      validate: {
        payload: {
          username: Joi.string().required(),
          name: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: user.login,
    config: {
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    }
  }
];

module.exports = routes;
