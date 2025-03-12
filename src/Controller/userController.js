const userService = require('../Service/userService');

const login = async (req,res)=>{

    const {email,password} = req.query;
    if (!email || !password){
        return res.status(400).json({message: 'Invalid username or password'});
    }
    const user = await userService.findUserByEmailAndPassword(email, password)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(400).json({message: 'Login failed. Please check your email and password, and try again.'})
    }
}

const register = async (req,res)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!req.body.firstname || !req.body.lastname || !emailRegex.test(req.body.email)  || !req.body.password || !req.body.role){
        return res.status(400).json({message: 'Invalid firstname, lastname, password, email or role.'})
    }
    const user = await userService.createUser(req.body)
    if(user){
        res.status(201).json({message:"User created",user:user})
    }else{
        res.status(400).json({message:"Failed to create user"})
    }
}

module.exports = {
    login, register
}