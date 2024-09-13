const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require('validator');
const { validationResult } = require('express-validator');
const jwtSecret = "MynameisRishiRajandInstant";


const isValidCredentials = async (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ errors: "Please enter all fields" });
    }
    if (password.length < 5) {
        return res.status(400).json({ errors: "Password should be of minimum 5 characters" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ errors: "Please enter a valid email" });
    }
    next();
}



const getAllUsers = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.find();
        res.status(200).json({ User: user });
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

const CreateUser = async (req, res) => {

    try {
        const ifUserExist =  await User.findOne({ email: req.body.email });
        if (ifUserExist) {
            return res.status(400).json({ errors: "User already exists" });
        }

        const errors = validationResult(req);
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        const val = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location,
            pincode:req.body.pincode
        })
        res.status("201").json({ success: true, data: val });


    }
    catch (error) {
        res.json({
            success: false,
            "Error Message": error.message
        });
    }
}

const loginUser = async (req, res) => {
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if(!userData) {
            return res.status(400).json({ errors: "User with given Email does not exist. Please proceed with signup" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Please ,Try Logging with correct Credentials" })
        }
    
        const data = {
            user: {
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken , data : userData });
    }
    catch (error) {
        console.log(error);
        res.json({
             success: false,
             message: error.message
            });
    }
}



const UserMethods = {
    isValidCredentials: isValidCredentials,
    CreateUser: CreateUser,
    loginUser: loginUser,
    getAllUsers : getAllUsers
};

module.exports = UserMethods;
