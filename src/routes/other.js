const express = require("express");

const router = express.Router();

const otherController = require('../controllers/otherController')

router.post('/', otherController.createOther);
router.get('/', otherController.getAllOthers);
router.delete('/:id', otherController.deleteOther);
router.put('/', otherController.updateOther);
router.patch('/', otherController.patchOther);

module.exports = router