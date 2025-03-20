const userDAO = require('../Repository/userDAO')
const {v4:uuidv4} = require('uuid');
const { hashPassword, comparePassword } = require('../Utils/bcrypt');

async function findUserByUsernameAndPassword({username,password}) {
    const user = await userDAO.getUserByUsername(username)
    if(user && await comparePassword(password,user?.password)){
        return {success:true,user:user}
    }else{
        return {success:false,message:'Incorrect username or password'}
    }
}

async function createUser({firstname, middlename, lastname,username, email, password, address, picture}){
    password = await hashPassword(password)
    const exist = await userDAO.getUserByUsername(username)

    if(!exist){
        const userObj = {userId: uuidv4(), firstname, middlename, lastname, username, email, password, address, picture, role:"Employee"}
        const createStatus = await userDAO.createUser(userObj)
        if(createStatus){
            return {success:true,user:userObj};
        }else{
            return {success:false,message:"Failed to create user"};
        }
    }else{
        return {success:false, message:"Username is already in use"};
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

async function updateRole(managerId, {userId,role}) {
    if(managerId != userId){
        const user = await userDAO.getUserById(userId)
        if(user){
            const updatedUser = await userDAO.updateUser(userId,{role})
            if(updatedUser){
                return {success:true,message:"Role updated"}
            }else{
                return {success:false,code:500, message:"Failed to update"}
            }
        }else{
            return {success:false,code:400, message:"User does not exist"}
        }
    }else{
        return {success:false, code:403, message:"Cannot change your own role"}
    }
}

module.exports = {findUserByUsernameAndPassword,createUser, findUserById, updateRole}