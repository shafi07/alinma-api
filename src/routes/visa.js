const express = require("express");

const router = express.Router();

const visaController = require('../controllers/visaController')

router.post('/', visaController.createVisa);
router.get('/', visaController.getAllVisa);
router.delete('/:id', visaController.deleteVisa);
router.put('/', visaController.updateVisa);

module.exports = router