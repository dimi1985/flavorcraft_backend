// functions/login.js

const UserController = require('../controllers/UserController');

exports.handler = async (event, context) => {
  return UserController.login(event, context);
};
