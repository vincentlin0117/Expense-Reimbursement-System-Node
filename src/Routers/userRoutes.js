const express = require('express')
const userRouter = express.Router()
const {register,login,updateRole,updateAccount} = require('../Controller/userController');
const {authorizeRole} = require('../Middleware/AuthRoleMiddleware')
const { authenticateToken } = require('../Middleware/AuthTokenMiddleware');

userRouter.post('/user/login', login)
userRouter.post('/',register)
userRouter.put('/user/:userId/role', authenticateToken, authorizeRole("Manager"), updateRole)
userRouter.put('/user/account',authenticateToken, updateAccount)

module.exports = {userRouter}