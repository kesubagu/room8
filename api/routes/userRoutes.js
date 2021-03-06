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
          email: Joi.string().email().required(),
          username: Joi.string().token().required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          password: Joi.string().token().required()
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
          username: Joi.string().token().required(),
          password: Joi.string().token().required()
        }
      }
    }
  }
];

module.exports = routes;
