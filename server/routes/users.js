////////////////////// User-Route /////////////////

// Requiring third party packages
const express = require('express');
const router = express.Router();

// Requiring inbuilt packages
const auth = require('../middleware/auth');
const { registerUser, loginUser, loadUser, updateUser } = require('../controllers/users');

// Specifying the controllers
router.get('/user', auth, loadUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/user/:id', auth, updateUser);

// Exporting the router
module.exports = router;