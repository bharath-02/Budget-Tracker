const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { SECRET_KEY } = require('../config');

const login = async(req, res) => {
    try {
        let user = await User.findOne({
            "email": req.body.email
        })
        if (!user) {
            return res.status('401').json({
                error: "User not found"
            })
        }
        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({
                error: "Email and password don't match."
            })
        }

        const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.cookie('t', token, { expire: new Date() + 9999 });

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.status('401').json({
            error: 'Could not log-in'
        })
    }
}

const logout = (req, res) => {
    res.clearCookie('t');
    return res.status('200').json({
        message: 'Logged out'
    })
}

const requireLogin = expressJwt({
    secret: SECRET_KEY,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!(authorized)) {
        return res.status('403').json({
            error: 'User is not authorized'
        })
    }
    next();
}

module.exports = {
    login,
    logout,
    requireLogin,
    hasAuthorization
}