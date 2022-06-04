const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Clone = db.model('Clone', {
  name: String,
  legion: String
});

module.exports = Clone;