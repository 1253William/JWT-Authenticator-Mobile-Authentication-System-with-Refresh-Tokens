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
            return res.status(409).json({message: "User already exists"});
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

        const {email, password}= req.body;

        //Check if body params are empty
        if(!email || !password){
            return res.status(422).json({message: "All fields are required"});
        }

         //Check if user exists
        const existingUser = await User.findOne({email})
        if(!existingUser) {
           return res.status(401).json({message:"Email or Password is invalid"});
        }

        //Compare user password to hashed password
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if(!passwordMatch){
            return res.status(401).json({message: "Email or Password is invalid"})
        }

        //Generate JWT token
        //We first create the access token and then a refresh token
        const accessToken = jwt.sign({userId:existingUser._id}, process.env.JWT_SECRET_KEY, {subject: 'accessToken', expiresIn: '1h'});

        const refreshToken = jwt.sign({userId: existingUser._id}, process.env.JWT_REFRESH_TOKEN,{subject:'refreshToken', expiresIn: '1w'});

        return res.status(200).json({
            message: "User logged in successfully",
            accessToken,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

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