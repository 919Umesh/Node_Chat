const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('../middlewares/authorization');
const {  handleCreateNotes,  handleGetNotes,handleGetSemesters,handleGetSubjectsBySemester,handleGetNotesBySubject } = require('../controllers/notes');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'notes/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/upload', 
    upload.single('notesFile'), 
    handleCreateNotes
);

router.get('/all', handleGetNotes);

router.get('/semesters', handleGetSemesters);

router.get('/subjects', handleGetSubjectsBySemester);

router.get('/notes', handleGetNotesBySubject);



module.exports = router;