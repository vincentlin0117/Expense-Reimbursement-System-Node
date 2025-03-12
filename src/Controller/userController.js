const express = require('express')
const userService = require('../Service/userService')
const userController = express.Router()
const logger = require('../Utils/logger')
userController.get('/user',(req,res) =>{
    res.status(200).json({message: "You got it!"})
}) 

userController.get('/login',async (req,res)=>{

    const {email,password} = req.query;
    if (!email || !password){
        return res.status(400).json({message: 'Please enter a valid Username and password.'});
    }
    const user = await userService.findUserByEmailAndPassword(email, password)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(400).json({message: 'Login failed. Please check your email and password, and try again.'})
    }
})

userController.post('/register',async (req,res)=>{

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!req.body.firstname || !req.body.lastname || !emailRegex.test(req.body.email)  || !req.body.password || !req.body.role){
        return res.status(400).json({message: 'Please enter a valid firstname, lastname, password, email and role'})
    }
    const user = await userService.createUser(req.body)
    if(user){
        res.status(201).json({message:"User created",user:user})
    }else{
        res.status(400).json({message:"Please check your inputs"})
    }
})

module.exports = {
    userController
}