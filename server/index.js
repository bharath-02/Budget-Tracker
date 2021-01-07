////////////////// Server-side code //////////////////

// Requiring third party packages
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

// Requiring inbuilt packages
dotenv.config({ path: '../config/config.env' });
const userRoute = require('./routes/users');
const transactionRoute = require('./routes/transactions');

// Initializing the app
const app = express();
app.use(express.json());

// PORT
const PORT = process.env.PORT || 5050;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Specifying routes
app.use('/api/transactions', transactionRoute);
app.use('/api/users', userRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Establishing Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Error Occured'.red.bold);
    } else {
        console.log('Database Connected'.cyan.bold);
    }
})

// Listening to the port
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`.yellow.bold);
})