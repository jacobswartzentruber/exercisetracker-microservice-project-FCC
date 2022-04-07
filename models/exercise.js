const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,
    duration: Number,
    date: Date
});

//export model
module.exports = mongoose.model('Exercise', ExerciseSchema);