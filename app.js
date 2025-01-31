const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connection');
const userRouter = require('./routes/login');
const notesRouter = require('./routes/notes');
const app = express();
const port =  4000;

app.use(express.json());

app.use('/userProfile', express.static(path.join(__dirname, 'userProfile')));
app.use('/notes', express.static(path.join(__dirname, 'notes')));


app.use(express.urlencoded({ extended: true }));

connectMongoDB('mongodb+srv://globaltechumesh11:E.ecAk7t.2UUuyK@projectmanage.an17y.mongodb.net/?retryWrites=true&w=majority&appName=ProjectManage');

app.use('/users', userRouter);
app.use('/notes', notesRouter);

app.listen(port, () => {
  console.log(`Server is running in https://node-chat-mvlu.onrender.com:${port}`);
});


