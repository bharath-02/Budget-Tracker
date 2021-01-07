///////////////// Transaction-Controller /////////////

// Requiring third party packages
const moment = require('moment');

// Requiring inbuilt packages
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Controller for getting all transactions
// GET /api/transactions/getTransactions
// Private
module.exports.getTransactions = async(req, res, next) => {
    try {
        const transactions = await Transaction.find({ user: req.user });
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Controller for getting particular transaction
// GET /api/transactions/getTransaction/:query
// Private
module.exports.getTransaction = async(req, res, netx) => {
    try {
        const { query } = req.params;
        const transactions = await Transaction.find({
            user: req.user.id,
            data: {
                $gte: moment().startOf(query),
                $lte: moment().endOf(query)
            }
        });
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Controller for adding new transactions
// POST /api/transactions/addTransactions
// Private
module.exports.addTransactions = async(req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transaction = await Transaction.create(req.body);
        transaction.user = req.user.id;
        transaction.save();
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// Controller for updating particular transaction
// PUT /api/transactions/updateTransaction/:id
// Private
module.exports.updateTransaction = async(req, res, next) => {
    try {
        const { amount, text, date } = req.body;
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id, { amount, text, date }, { new: true }
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        return res.status(200).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Controller for deleting transactions
// DELETE /api/transactions/deleteTransactions/:id
// Private
module.exports.deleteTransactions = async(req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};