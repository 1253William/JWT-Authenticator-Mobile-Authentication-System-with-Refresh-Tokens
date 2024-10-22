const express = require('express');
const router = express.Router();

// @route POST /api/v1/auth/register
// @description Register a new user
// @access      Public
router.post('/register');

// @route POST /api/v1/auth/login
// @description Login an existing user
// @access      Public
router.post('/login');



module.exports = router;