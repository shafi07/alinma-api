const express = require("express");

const router = express.Router();

const zakathController = require('../controllers/zakathController');

router.post('/', zakathController.createZakath);
router.get('/', zakathController.getAllZakath);
router.delete('/:id', zakathController.deleteZakath);
router.put('/', zakathController.updateZakath);
router.patch('/',zakathController.patchZakath);

module.exports = router