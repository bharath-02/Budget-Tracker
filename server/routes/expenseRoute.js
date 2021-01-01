const express = require('express');
const expenseController = require('../controllers/expenseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/api/expenses/current/preview', authController.requireLogin, expenseController.currentMonthPreview);
router.get('/api/expenses/by/category', authController.requireLogin, expenseController.expenseByCategory);
router.get('/api/expenses/plot', authController.requireLogin, expenseController.plotExpenses);
router.get('/api/expenses/category/averages', authController.requireLogin, expenseController.averageCategories);
router.get('/api/expenses/yearly', authController.requireLogin, expenseController.yearlyExpenses);
router.get('/api/expenses', authController.requireLogin, expenseController.listByUser);
router.post('/api/expenses', authController.requireLogin, expenseController.create);
router.put('/api/expenses/:expenseId', authController.requireLogin, expenseController.hasAuthorization, expenseController.update);
router.delete('/api/expenses/:expenseId', authController.requireLogin, expenseController.hasAuthorization, expenseController.remove);

router.param('expenseId', expenseController.expenseByID);

module.exports = router;