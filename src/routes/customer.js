const express = require("express");

const router = express.Router();

const customerController = require('../controllers/customerController')

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomer);
router.delete('/:id', customerController.deleteCustomer);
router.put('/', customerController.updateCustomer);

module.exports = router