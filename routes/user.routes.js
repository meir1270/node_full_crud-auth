const {protect} = require('../middleware/authMiddleware')

module.exports = (app) => {
    const users = require('../controllers/user.controller');

    // Register a new User
    app.post('/register', users.registerUser);

    // Login a User
    app.post('/login', users.loginUser);

    // Retrieve a single Note with noteId
    app.get('/me/:userId',protect, users.getMe);
}