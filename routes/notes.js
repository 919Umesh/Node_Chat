const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('../middlewares/authorization');
const {  handleCreateNotes,  handleGetNotes,handleGetSemesters,handleGetSubjectsBySemester,handleGetNotesBySubject } = require('../controllers/notes');

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'notes/')
    },
    filename: (req, file, cb) => {  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
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
    storage: multer.memoryStorage() ,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
});

router.post('/upload', 
    upload.single('notesFile'), 
    handleCreateNotes
);

router.get('/all', handleGetNotes);

router.get('/semesters', handleGetSemesters);

router.get('/subjects', handleGetSubjectsBySemester);

router.get('/notes', handleGetNotesBySubject);



module.exports = router;