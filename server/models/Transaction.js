//////////////////// Transaction-Model /////////////

// Requiring third party packages
const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

// Defining the TransactionSchema
const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please enter the amount']
    },
    date: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

TransactionSchema.plugin(timeZone);
// Exporting the TransactionSchema
module.exports = mongoose.model('Transaction', TransactionSchema);