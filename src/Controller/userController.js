const userService = require('../Service/userService');
const joi = require('joi')

const login = async (req,res)=>{
    const loginSchema = joi.object({
        email: joi.string().email().required(),
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

    const user = await userService.findUserByEmailAndPassword(value)

    if(user.success){
        res.status(200).json(user.user)
    }else{
        res.status(400).json({message: user.message})
    }
}

const register = async (req,res)=>{
    const userSchema = joi.object({
        firstname: joi.string().required(),
        middlename: joi.string().optional(), // Optional field
        lastname: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
        address: joi.object({
            street: joi.string().required(),
            city: joi.string().required(),
            state: joi.string().length(2).uppercase().required(),
            postalCode: joi.string().pattern(/^[0-9]{5}(-[0-9]{4})?$/).required(),
            country: joi.string().required()
        }).optional(),
        picture: joi.string().uri().optional(), // Optional field
        role: joi.string().required()
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

module.exports = {
    login, register
}