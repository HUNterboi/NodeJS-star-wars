const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Jedi = db.model('Jedi', {
  name: String,
  rang: String,
  midi: Number,
  clone: String
});

module.exports = Jedi;