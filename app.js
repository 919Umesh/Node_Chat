// const express = require('express');
// const path = require('path');
// const { connectMongoDB } = require('./connection');
// const userRouter = require('./routes/login');
// const notesRouter = require('./routes/notes');
// const app = express();
// const port =  4000;

// app.use(express.json());


// app.use('/userProfile', express.static('userProfile'));
// app.use('/notes', express.static('notes'));


// app.use(express.urlencoded({ extended: true }));

// connectMongoDB('mongodb+srv://globaltechumesh11:E.ecAk7t.2UUuyK@projectmanage.an17y.mongodb.net/?retryWrites=true&w=majority&appName=ProjectManage');

// app.use('/users', userRouter);
// app.use('/notes', notesRouter);

// app.listen(port, () => {
//   console.log(`Server is running in https://node-chat-mvlu.onrender.com:${port}`);
// });



const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connection');
const userRouter = require('./routes/login');
const notesRouter = require('./routes/notes');
const fs = require('fs');

const app = express();
const port = 4000;

// Ensure required directories exist
const userProfilePath = path.join(__dirname, 'userProfile');
const notesPath = path.join(__dirname, 'notes');

if (!fs.existsSync(userProfilePath)) {
    fs.mkdirSync(userProfilePath, { recursive: true });
}
if (!fs.existsSync(notesPath)) {
    fs.mkdirSync(notesPath, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/userProfile', express.static(userProfilePath));
app.use('/notes', express.static(notesPath));

// Connect to MongoDB
connectMongoDB('mongodb+srv://globaltechumesh11:E.ecAk7t.2UUuyK@projectmanage.an17y.mongodb.net/?retryWrites=true&w=majority&appName=ProjectManage');

// Routes
app.use('/users', userRouter);
app.use('/notes', notesRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
