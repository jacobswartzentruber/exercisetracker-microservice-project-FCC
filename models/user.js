const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    }
});

UserSchema.virtual('logs', {
    ref: 'Exercise',
    localField: '_id',
    foreignField: 'user'
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

//export model
module.exports = mongoose.model('User', UserSchema);