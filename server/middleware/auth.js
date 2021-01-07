/////////////////////// Middleware ///////////////// 

// Requiring third party packages
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Requiring inbuilt packages
dotenv.config({ path: '../../config/config.env' });

// Auth Middleware
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Invalid token' });
    }
}

// Exporting the middleware
module.exports = auth;