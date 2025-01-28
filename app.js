const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connection');
const userRouter = require('./routes/login');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectMongoDB('mongodb+srv://globaltechumesh11:E.ecAk7t.2UUuyK@projectmanage.an17y.mongodb.net/?retryWrites=true&w=majority&appName=ProjectManage');

// Routes
app.use('/users', userRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
