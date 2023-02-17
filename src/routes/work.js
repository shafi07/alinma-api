const express = require("express");

const router = express.Router();

const workController = require('../controllers/workController')

router.post('/', workController.createWork);
router.get('/', workController.getAllWork);
router.delete('/:id', workController.deleteWork);
router.put('/', workController.updateWork);
router.patch('/', workController.patchWork);

module.exports = router