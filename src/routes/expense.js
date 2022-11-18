const express = require("express");

const router = express.Router();

const expenseController = require('../controllers/expenseController')

router.post('/', expenseController.createExpense);
router.get('/', expenseController.getAllExpense);
router.delete('/:id', expenseController.deleteExpense);
router.put('/', expenseController.updateExpense);

module.exports = router