// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true, 
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// const Users = mongoose.model('User', userSchema);

// module.exports = Users;


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    lowercase: true, // Converts email to lowercase
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'], // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Restrict gender to specific values
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18, // Minimum age requirement
    max: 100, // Maximum age requirement
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is not modified
  const salt = await bcrypt.genSalt(10); // Generate a salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;