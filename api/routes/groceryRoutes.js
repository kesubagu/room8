const Joi = require('Joi');
const grocery = require('../handlers/grocery');

var routes = [
  {
    method: 'POST',
    path: '/grocery/item',
    handler: grocery.addGrocery,
    config: {
      validate: {
        headers: Joi.object({
          authorization: Joi.string().alphanum().required()
        }).options({ allowUnknown: true }),
        payload: {
          name: Joi.string().required(),
          roomId: Joi.string().alphanum().required()
        }
      }
    }
  }
]
