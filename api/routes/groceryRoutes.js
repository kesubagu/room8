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
  },
  {
    method: 'GET',
    path: '/grocery/item/{listId}/{itemId}',
    handler: grocery.getItem,
    config: {
      validate: {
        headers: Joi.object({
          authorization: Joi.string().alphanum().required()
        }).options({ allowUnknown: true }),
        params: {
          listId: Joi.string().alphanum().required(),
          itemId: Joi.string().alphanum().required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/grocery/{listId}/bought',
    handler: grocery.clearBought,
    config: {
      validate: {
        headers: Joi.object({
          authorization: Joi.string().alphanum().required()
        }).options({ allowUnknown: true }),
        params: {
          listId: Joi.string().alphanum().required()
        }
      }
    }
  }
]

module.exports = routes;
