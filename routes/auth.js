const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Register a new user
router.post('/register', UserController.register);

// User login
router.post('/login', UserController.login);

module.exports = router;
