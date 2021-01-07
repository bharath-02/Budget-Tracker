////////////////////// User-Model /////////////////

// Requiring third party packages
const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Requiring inbuilt packages
dotenv.config({ path: '../../config/config.env' });

// Defining the UserSchema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now()
    }
});

// Generating the token
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this.id, name: this.name }, process.env.JWT_SECRET);
    return token;
}

// Exporting the UserSchema
module.exports = mongoose.model('User', UserSchema)