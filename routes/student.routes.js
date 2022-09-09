module.exports = (app) => {
    const students = require('../controllers/student.controller');

    // Create a new Note
    app.post('/students', students.create);

    // Retrieve all students
    app.get('/students', students.findAll);

    // Retrieve a single Note with noteId
    app.get('/students/:sid', students.findOne);

    // Update a Note with sid
    app.put('/students/:sid', students.update);

    // Delete a Note with sid
    app.delete('/students/:sid', students.delete);
}