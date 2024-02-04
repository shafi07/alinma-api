const express = require("express");

const router = express.Router();

const agentController = require('../controllers/agentController')

router.post('/',);
router.get('/',agentController.getAllAgents);
router.delete('/:id',);
router.put('/',);
router.patch('/',);

module.exports = router