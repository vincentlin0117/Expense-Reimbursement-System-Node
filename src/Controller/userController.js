const userService = require('../Service/userService');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const key = require('dotenv').config('./src/.env').parsed.JWT_SECRET

const login = async (req,res)=>{
    const loginSchema = joi.object({
        username: joi.string().required(),
        password: joi.string().min(8).required()
    })

    const {error,value} = loginSchema.validate(req.body,{abortEarly:false})

    if (error){
        const messages = [];

        error.details.forEach(detail =>{
            const cleanMsg = detail.message.replace(/"/g,'')
            messages.push(cleanMsg)
        })

        return res.status(400).json({message:messages});
    }

    const user = await userService.findUserByUsernameAndPassword(value)

    if(user.success){
        const token = jwt.sign({
            userId: user.user.userId,
            username: user.user.username,
            role: user.user.role,
        },key,{
            expiresIn:'15m'
        })
        res.status(200).json({message:"Successful login",token})
    }else{
        res.status(400).json({message: user.message})
    }
}

const register = async (req,res)=>{
    const userSchema = joi.object({
        firstname: joi.string().optional(),
        middlename: joi.string().optional(),
        lastname: joi.string().optional(),
        username: joi.string().required(),
        email: joi.string().email().optional(),
        password: joi.string().min(8).required(),
        address: joi.object({
            street: joi.string().required(),
            city: joi.string().required(),
            state: joi.string().length(2).uppercase().required(),
            postalCode: joi.string().pattern(/^[0-9]{5}(-[0-9]{4})?$/).required(),
            country: joi.string().required()
        }).optional(),
        picture: joi.string().uri().optional(),
    })

    const {error, value} = userSchema.validate(req.body)

    if(error){
        const messages = [];

        error.details.forEach(detail =>{
            const cleanMsg = detail.message.replace(/"/g,'')
            messages.push(cleanMsg)
        })

        return res.status(400).json({message:messages});
    }

    const user = await userService.createUser(value)
    if(user.success){
        res.status(201).json({message:"User created",user:user.user})
    }else{
        res.status(400).json({message:user.message})
    }
}
const updateRole = async (req,res)=>{
    const updateRoleSchema = joi.object({
        userId: joi.string().required(),
        role: joi.string().valid('Employee','Manager').required()
    })

    const {error,value} = updateRoleSchema.validate({userId:req.params.userId, role:req.body.role})

    if(error){
        const messages = [];

        error.details.forEach(detail =>{
            const cleanMsg = detail.message.replace(/"/g,'')
            messages.push(cleanMsg)
        })

        return res.status(400).json({message:messages});
    }

    const result = await userService.updateRole(req.locals.tokenDetail.userId,value)

    if(result.success){
        return res.status(200).json({message:result.message})
    }else{
        return res.status(result.code).json({message:result.message})
    }
    
}
module.exports = {
    login, register,updateRole
}