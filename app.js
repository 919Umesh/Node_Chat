// const express = require('express');
// const path = require('path');
// const { connectMongoDB } = require('./connection');
// const userRouter = require('./routes/login');

// const app = express();
// const port = 4000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// connectMongoDB('mongodb+srv://globaltechumesh11:E.ecAk7t.2UUuyK@projectmanage.an17y.mongodb.net/?retryWrites=true&w=majority&appName=ProjectManage');

// // Routes
// app.use('/users', userRouter);

// // Start server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connection');
const userRouter = require('./routes/login');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectMongoDB(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Routes
app.use('/users', userRouter);

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: 'OK', message: 'Server and database are healthy' });
  } catch (err) {
    res.status(500).json({ status: 'Error', message: 'Database connection failed', error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});