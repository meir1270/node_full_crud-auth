const Animal = require('../models/animal.model');

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Animal name can not be empty"
        });
    }

    // Create a Animal
    const animal = new Animal({
        name: req.body.name ,
        color: req.body.color || "black",
        age: req.body.age || 0,
    });

    // Save Animal in the database
    animal.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Animal."
        });
    });
};

// Retrieve and return all animals from the database.
exports.findAll = (req, res) => {
    Animal.find().then(animals => res.send(animals)//.map(stud => stud.email))}
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving animals."
        });
    });
};

// Find a single note with a animalID
exports.findOne = (req, res) => {
    Animal.findById(req.params.animalID)
    .then(animal => {
        if(!animal) {
            return res.status(404).send({
                message: "animal not found with id " + req.params.animalID
            });            
        }
        res.send(animal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "animal not found with id " + req.params.animalID
            });                
        }
        return res.status(500).send({
            message: "Error retrieving animal with id " + req.params.animalID
        });
    });
};

// Update a Animal identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "animal name can not be empty"
        });
    }

    // Find note and update it with the request body
    Animal.findByIdAndUpdate(req.params.animalID, {
        name: req.body.name || "Untitled Animal",
        color: req.body.color,
        age: req.body.age || 0,
    }, {new: true})
    .then(animal => {
        if(!animal) {
            return res.status(404).send({
                message: "animal not found with id " + req.params.animalID
            });
        }
        res.send(animal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "animal not found with id " + req.params.animalID
            });                
        }
        return res.status(500).send({
            message: "Error updating animal with id " + req.params.animalID
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Animal.findByIdAndRemove(req.params.animalID)
    .then(animal => {
        if(!animal) {
            return res.status(404).send({
                message: "animal not found with id " + req.params.animalID
            });
        }
        res.send({message: "animal deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "animal not found with id " + req.params.animalID
            });                
        }
        return res.status(500).send({
            message: "Could not delete animal with id " + req.params.animalID
        });
    });
};