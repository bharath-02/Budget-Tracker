const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compress = require('compression');
const helmet = require('helmet');

const template = require('./template');
const authRoute = require('./routes/authRoute');
const expenseRoute = require('./routes/expenseRoute');
const userRoute = require('./routes/userRoute');
const { DB_URL } = require('./config.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser);
app.use(cors());
app.use(compress());
app.use(helmet());

app.use('/', authRoute);
app.use('/', expenseRoute);
app.use('/', userRoute);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message });
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message });
        console.log(err);
    }
})

app.get('/', (req, res) => {
    res.send('Hello, There');
})

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected'.yellow.bold);
        return app.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at port ${PORT}`.cyan.bold);
    })
    .catch((err) => {
        console.log('Error Occured'.red.bold + err);
    })