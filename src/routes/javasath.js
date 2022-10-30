const express = require("express");

const router = express.Router();

const javasathController = require('../controllers/javasthController')

router.post('/',javasathController.createJavasth);
router.get('/',javasathController.getAllJavasath);
router.delete('/:id',javasathController.deleteJavasath);
router.put('/',javasathController.updateJavasath);

module.exports = router