const Notes = require('../models/notes');
const multer = require('multer');
const notes = multer({ dest: 'notes/' });
const path = require('path');

const handleCreateNotes = async (req, res) => {
    try {
        const { semester, subject } = req.body;
        const notesFile = req.file ? req.file.path : null;

        if (!semester || !subject || !notesFile) {
            return res.status(400).json({ 
                status: 400, 
                message: 'All fields are required' 
            });
        }

        const newNotes = new Notes({
            semester,
            subject,
            notesFile
        });

        await newNotes.save();

        res.status(201).json({
            status: 201,
            message: 'Notes uploaded successfully',
            notes: newNotes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 500, 
            message: 'Server error, please try again later' 
        });
    }
};

const handleGetNotes = async (req, res) => {
    try {
        const notes = await Notes.find({});
        
        if (notes.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No notes found',
            });
        }

        const notesWithUrls = notes.map(note => {
            return {
                ...note._doc,
                notesFile: note.notesFile
                    ? `https://node-chat-mvlu.onrender.com/${note.notesFile.replace(/\\/g, '/')}`
                    : null
            };
        });

        res.status(200).json({
            status: 200,
            message: 'Notes retrieved successfully',
            notes: notesWithUrls
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 500, 
            message: 'Server error, please try again later' 
        });
    }
};


const handleGetSemesters = async (req, res) => {
    try {
        const semesters = await Notes.distinct('semester');

        if (semesters.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No semesters found',
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Semesters retrieved successfully',
            semesters: semesters
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 500, 
            message: 'Server error, please try again later' 
        });
    }
};


const handleGetSubjectsBySemester = async (req, res) => {
    try {
        const { semester } = req.query;
        if (!semester) {
            return res.status(400).json({
                status: 400,
                message: 'Semester query parameter is required',
            });
        }

        const subjects = await Notes.distinct('subject', { semester });

        if (subjects.length === 0) {
            return res.status(404).json({
                status: 404,
                message: `No subjects found for semester ${semester}`,
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Subjects retrieved successfully',
            subjects: subjects
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 500, 
            message: 'Server error, please try again later' 
        });
    }
};



const handleGetNotesBySubject = async (req, res) => {
    try {
        const { semester, subject } = req.query;
        if (!semester || !subject) {
            return res.status(400).json({
                status: 400,
                message: 'Both semester and subject query parameters are required',
            });
        }

        const notes = await Notes.find({ semester, subject });

        if (notes.length === 0) {
            return res.status(404).json({
                status: 404,
                message: `No notes found for subject ${subject} in semester ${semester}`,
            });
        }

        const notesWithUrls = notes.map(note => {
            return {
                ...note._doc,
                notesFile: note.notesFile
                    ? `https://node-chat-mvlu.onrender.com/${note.notesFile.replace(/\\/g, '/')}`
                    : null
            };
        });

        res.status(200).json({
            status: 200,
            message: 'Notes retrieved successfully',
            notes: notesWithUrls
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: 500, 
            message: 'Server error, please try again later' 
        });
    }
};

module.exports = { 
    handleCreateNotes, 
    handleGetNotes,
    handleGetSemesters,
    handleGetSubjectsBySemester,
    handleGetNotesBySubject
};