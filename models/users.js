//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Schema Configuration
userSchema.plugin(uniqueValidator);

//Schema Exports
module.exports = mongoose.model('User', userSchema);