const express = require("express");

const router = express.Router();

const userController = require('../controllers/userController')

router.post('/auth',userController.userLogin);

module.exports = router