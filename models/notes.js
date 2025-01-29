const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    semester: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    notesFile: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;