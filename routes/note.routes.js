module.exports = (app) => {
    const notes = require('../controllers/note.controller');
    const {protect} = require('../middleware/authMiddleware')

    // Create a new Note
    app.post('/notes',protect, notes.create);

    // Retrieve all Notes
    app.get('/notes',protect, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId',protect, notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId',protect, notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId',protect, notes.delete);
}