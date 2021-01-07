/////////////////////// User-Controller /////////////

// Requiring third party packages
const bcrypt = require('bcryptjs');

// Requiring inbuilt packages
const User = require('../models/User');
const { registerValidation, loginValidation } = require('./validation');

// Controller for Registering new User
// Public
// POST /api/users/register
module.exports.registerUser = async(req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('This email has already been registered');
        }

        user = await User.create({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const token = user.generateAuthToken();
        return res
            .status(201)
            .header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token')
            .json({
                success: true,
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Controller for Logging users
// Public
// POST /api/users/login
module.exports.loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User does not exist');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }

        const token = user.generateAuthToken();
        res.header('x-auth-token', token);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Controller for getting user data
// Private
// GET /api/users/user
module.exports.loadUser = async(req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json({
        success: true,
        user
    });
};

// Controller for Updating the user data
// Private
// PUT /api/users/user/:id
module.exports.updateUser = async(req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id, { name, email }, { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};