const express = require('express')
const userRouter = express.Router()
const {register,login} = require('../Controller/userController');
const { authenticateToken } = require('../Utils/jwt');

userRouter.post('/login', login)
userRouter.post('/register',register)

module.exports = {userRouter}