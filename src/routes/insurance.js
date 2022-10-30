const express = require("express");

const router = express.Router();

const insuranceController = require('../controllers/insuranceController')

router.post('/', insuranceController.createInsurance);
router.get('/', insuranceController.getAllInsurance);
router.delete('/:id', insuranceController.deleteInsurance);
router.put('/', insuranceController.updateInsurance);

module.exports = router