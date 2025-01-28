const mongoose = require('mongoose');

const connectMongoDB = (uri) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = { connectMongoDB };
