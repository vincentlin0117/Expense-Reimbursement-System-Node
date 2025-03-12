const userDAO = require('../Repository/userDAO')
const {v4:uuidv4} = require('uuid');

async function findUserByEmailAndPassword({email,password}) {
    const user = await userDAO.getUserByEmailAndPassword(email,password)
    if(user){
        return {success:true,user:user}
    }else{
        return {success:false,message:'Incorrect email or password'}
    }
}

async function createUser({firstname, middlename, lastname, email, password, address, picture, role}){
    const exist = await userDAO.getUserByEmail(email,password)

    if(!exist){
        const userObj = {userId: uuidv4(), firstname, middlename, lastname, email, password, address, picture, role}
        const createStatus = await userDAO.createUser(userObj)
        if(createStatus){
            return {sucess:true,user:userObj};
        }else{
            return {success:false,message:"Failed to create user"};
        }
    }else{
        return {success:false, message:"Email is already in use"};
    }

}

async function findUserById(userId) {
    const user = await userDAO.getUserById(userId)
    if(user){
        return {success:true,user:user}
    }else{
        return {success:false,message:"Failed to find user with that userid"};
    }
}

module.exports = {findUserByEmailAndPassword,createUser, findUserById}