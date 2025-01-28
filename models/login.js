const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'], 
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 12, 
    max: 100, 
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;