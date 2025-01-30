const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('../middlewares/authorization');
const {handleCreateQuestions,handleGetQuestions, handleGetQuestionSemesters, handleGetQuestionBySemester,handleGetQuestionsBySubject
} = require('../controllers/questions');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'questions/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
});

router.post('/upload',upload.single('questionFile'),handleCreateQuestions);

router.get('/all', handleGetQuestions);

router.get('/semesters', handleGetQuestionSemesters);

router.get('/subjects', handleGetQuestionBySemester);

router.get('/questions', handleGetQuestionsBySubject);

module.exports = router;