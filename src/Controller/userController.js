const express = require('express')

const userController = express.Router()

userController.get('/user',(req,res) =>{
    res.status(200).send(JSON.stringify({message: "You got it!"}))
}) 

module.exports = {
    userController
}