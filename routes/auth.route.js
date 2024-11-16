const express = require('express');
const router = express.Router();
const { register, login, resetPassword } = require('../controllers/user.controller');

// @route POST /api/v1/auth/register
// @description Register a new user
// @access      Public
router.post('/register', register);

// @route POST /api/v1/auth/login
// @description Login an existing user
// @access      Public
router.post('/login', login);


// @route PUT /api/v1/auth/resetpassword 
// @description Reset password
// @access Private
router.put('/resetpassword', resetPassword);



module.exports = router;