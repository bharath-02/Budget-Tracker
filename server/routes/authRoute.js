const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('auth/login', authController.login);
router.get('auth/logout', authController.logout);

module.exports = router