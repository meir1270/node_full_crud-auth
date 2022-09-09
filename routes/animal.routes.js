module.exports = (app) => {
    const animals = require('../controllers/animal.controller');

    // Create a new animals
    app.post('/animals', animals.create);

    // Retrieve all animals
    app.get('/animals', animals.findAll);

    // Retrieve a single animals with animalID
    app.get('/animals/:animalID', animals.findOne);

    // Update a animals with animalID
    app.put('/animals/:animalID', animals.update);

    // Delete a animals with animalID
    app.delete('/animals/:animalID', animals.delete);
}