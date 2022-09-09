const mongoose = require('mongoose');
// var AutoIncrement = require('mongoose-sequence')(mongoose);
const AnimalSchema = mongoose.Schema({
    // _id: {type: String, required: true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: String,
    color: String,
    age: Number,
});

module.exports = mongoose.model('Animal', AnimalSchema);