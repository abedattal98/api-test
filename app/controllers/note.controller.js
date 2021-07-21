const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = async (req, res) => {
    // Create a Note
    const note = new Note(req.body);
    try {
        const a1 = await note.save()
        res.json(a1)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    }
};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    }

};

// Find a single note with a noteId
exports.findOne = async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId)
        res.json(note)
    } catch (err) {
        {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        }
    }
};

// Update a note identified by the noteId in the request
exports.update = async (req, res,next) => {
    // Validate Request
    try {
        const note = await Note.findByIdAndUpdate(req.params.noteId, {
            title: req.body.title,
            content: req.body.content || "no content"

        })
        
        res.json(note)
    }
    catch (err) {
        {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        }
    }

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
};
