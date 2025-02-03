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
const fs = require('fs');
const { connectMongoDB } = require('./connection');
const userRouter = require('./routes/login');
const notesRouter = require('./routes/notes');

const app = express();
const port = 4000;

// Ensure 'userProfile' directory exists
const userProfilePath = path.join(__dirname, 'userProfile');
if (!fs.existsSync(userProfilePath)) {
    fs.mkdirSync(userProfilePath, { recursive: true });
}

// Middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files correctly
app.use('/userProfile', express.static(userProfilePath));

// MongoDB Connection
connectMongoDB('mongodb+srv://globaltechumesh11:E.ecAk7t.2UUuyK@projectmanage.an17y.mongodb.net/?retryWrites=true&w=majority&appName=ProjectManage');

// Use Routers
app.use('/users', userRouter);
app.use('/notes', notesRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

