const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const NODE_ENV = 'production';
const MONGO_URI = 'mongodb+srv://Admin:tIpHfdLqYUnoX4UI@cluster0.6j8wc.mongodb.net/budgetTracker?retryWrites=true&w=majority'

// const transactions = require('./routes/transactions');

const app = express();

app.use(express.json());

if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

if (NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Error Occured', err);
    } else {
        console.log('Database Connected'.cyan.bold);
    }
})

app.listen(
    PORT,
    console.log(
        `Server running in ${NODE_ENV} mode in port ${PORT}`.blue.bold
    )
);