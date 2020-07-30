const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = require('./employee');

const userSchema = new Schema({
  company: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  employees: [employeeSchema]
});
module.exports = mongoose.model('User', userSchema);