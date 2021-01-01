const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/api/users', userController.list);
router.post('/api/users', userController.create);
router.get('/api/users/:userId', authController.requireLogin, userController.read);
router.put('/api/users/:userId', authController.requireLogin, authController.hasAuthorization, userController.update);
router.delete('/api/users/:userId', authController.requireLogin, authController.hasAuthorization, userController.remove);
router.param('userId', userController.userByID);

module.exports = router;