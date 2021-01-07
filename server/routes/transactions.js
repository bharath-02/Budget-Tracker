///////////////////// Transaction-Route ///////////

// requiring third party packages
const express = require('express')
const router = express.Router();

// Requiring inbuilt packages
const auth = require('../middleware/auth');
const { getTransactions, getTransaction, addTransactions, updateTransaction, deleteTransactions } = require('../controllers/transactions');

// Specifying the controllers
router.get('/getTransactions', getTransactions);
router.get('/getTransaction/:query', auth, getTransaction);
router.post('/addTransactions', auth, addTransactions);
router.put('/updateTransaction/:id', auth, updateTransaction);
router.delete('/deleteTransactions/:id', auth, deleteTransactions);

// Exporting the routers
module.exports = router;