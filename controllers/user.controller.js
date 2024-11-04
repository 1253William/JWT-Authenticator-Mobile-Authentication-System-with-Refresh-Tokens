const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();



/// Controller for Registering a new user
///POST /api/v1/auth/register
exports.register = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        //If body params are empty
        if(!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }
        //If user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
       //Hash incoming user password and save user details to DB
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name, 
            email,
            password: hashedPassword
        })

        const savedUser = await user.save();
        return res.status(201).json({
            message: "User registered successfully",
            savedUser});

        } catch(error){
            return res.status(500).json({message: error.message});
        }
    } 
  

/// Controller for Logging in an existing user
///POST /api/v1/auth/login
exports.login = async(req, res) => {
    try {

    } catch(error){
        return res.status(500).json({message: error.message});
    }
}


/// Controller for resetting password
/// POST /api/v1/auth/resetpassword
exports.resetPassword = async(req, res) => {
    try {

    } catch(error){
        return res.status(500).json({message: error.message});
    }
}