// controllers/UserController.js

const User = require('../models/User');
const bcrypt = require('../utils/bcrypt');

exports.register = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { username, password } = requestBody;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Username is already taken' }),
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

exports.login = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { username, password } = requestBody;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid credentials' }),
      };
    }

    // Check if the password matches
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid credentials' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
