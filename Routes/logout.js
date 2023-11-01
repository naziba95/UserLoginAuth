const express = require('express');
const router = express.Router();
const logoutController = require('../Controller/logout');

router.post('/', logoutController.handleLogout);

module.exports = router;