const Student = require('../models/student.model');

// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Student email can not be empty"
        });
    }

    // Create a Student
    const student = new Student({
        name: req.body.name || "rivka", 
        email: req.body.email,
        age: req.body.age || 0,
    });

    // Save Student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    Student.find().then(students => res.send(students)//.map(stud => stud.email))}
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Student.findById(req.params.sid)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.sid
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.sid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with id " + req.params.sid
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "student email can not be empty"
        });
    }

    // Find note and update it with the request body
    Student.findByIdAndUpdate(req.params.sid, {
        name: req.body.name || "Untitled Note",
        email: req.body.email,
        age: req.body.age || 0,
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.sid
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.sid
            });                
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.sid
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.sid)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.sid
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with id " + req.params.sid
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.sid
        });
    });
};