const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connection');
const userRouter = require('./routes/login');
const notesRouter = require('./routes/notes');
const questionRouter = require('./routes/questions');
const app = express();
const port =  4000;

app.use(express.json());

//Stored folder location
app.use('/userProfile', express.static('userProfile'));
app.use('/notes', express.static('notes'));
app.use('/questions', express.static('questions'));

app.use(express.urlencoded({ extended: true }));

connectMongoDB('mongodb+srv://globaltechumesh11:E.ecAk7t.2UUuyK@projectmanage.an17y.mongodb.net/?retryWrites=true&w=majority&appName=ProjectManage');

app.use('/users', userRouter);
app.use('/notes', notesRouter);
app.use('/questions', questionRouter);

app.listen(port, () => {
  console.log(`Server is running in https://node-chat-mvlu.onrender.com:${port}`);
});


