const Notes = require('../models/notes');
const multer = require('multer');
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
                    ? `${req.protocol}://${req.get('host')}/${note.notesFile.replace(/\\/g, '/')}`
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

const handleGetNotesBySemester = async (req, res) => {
    try {
        const { semester } = req.params;
        const notes = await Notes.find({ semester });

        if (notes.length === 0) {
            return res.status(404).json({
                status: 404,
                message: `No notes found for semester ${semester}`,
            });
        }

        const notesWithUrls = notes.map(note => {
            return {
                ...note._doc,
                notesFile: note.notesFile
                    ? `${req.protocol}://${req.get('host')}/${note.notesFile.replace(/\\/g, '/')}`
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
    handleGetNotesBySemester
};