const authController = require("express").Router()
const bcrypt = require("bcryptjs");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
// const SECRET = process.env.SECRET

authController.post("/register", async(req, res)=>{
    try {

        const {email, username, password, fullname} = req.body

        const existingUser = await User.findOne({$or: [{email},  {username}]})

        if(existingUser){
            return res.status(400).json({Success: false, Msg: "User already exist, try a new username or email"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username, fullname, email, password: hashedPassword
        })

        const token = jwt.sign({id: user._id}, process.env.SECRET , {expiresIn: "1hr"})

        user.token = token

        await user.save()

        return res.status(200).json({user, token})
        
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({success: false, Msg: "Server Error"})
    }
})


authController.post("/login", async(req, res)=>{
    try {
        const {email, username, password} = req.body
        
        const user = await User.findOne({$or: [{email},  {username}]})

        if(!user){
            return res.status(400).json({success: false, Msg: "Invalid User Credentials"})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            return res.status(400).json({success: false, Msg: "Invalid User Credentials"})
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: "1hr"})

        user.token = token

        return res.status(200).json({user, token})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({success: false, Msg: "Server Error"})
    }
})

module.exports = authController