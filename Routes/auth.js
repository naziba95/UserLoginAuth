const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

router.post('/', authController.handleLogin);

module.exports = router;

//route for Login