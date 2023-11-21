// functions/register.js

const UserController = require('../controllers/UserController');

exports.handler = async (event, context) => {
  return UserController.register(event, context);
};
