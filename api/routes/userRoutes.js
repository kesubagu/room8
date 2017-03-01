'use strict';

const Joi = require('Joi');
const user = require('../handlers/user');

let routes = [
  {
    method: 'POST',
    path: '/user/register',
    validate: {
      payload: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    },
    handler: user.register,
  },
  {
    method: 'POST',
    path: '/user/login',
    validate: {
      payload: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    },
    handler: user.login
  }
];

module.exports = routes;
