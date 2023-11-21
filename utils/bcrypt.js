// utils/bcrypt.js

const bcrypt = require('bcrypt');

const hash = async (data, saltRounds) => {
  return bcrypt.hash(data, saltRounds);
};

const compare = async (data, hash) => {
  return bcrypt.compare(data, hash);
};

module.exports = { hash, compare };
