const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      department:{
        type: String,
        required: true,
      },
      uid:{
        type: Number,
        required: true,
      }
});

module.exports = mongoose.model('Login',LoginSchema);