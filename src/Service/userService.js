const userDAO = require('../Repository/userDAO')
const {v4:uuidv4} = require('uuid');

async function findUserByEmailAndPassword(email,password) {
    const user = await userDAO.getUserByEmailAndPassword(email,password)
    if(user){
        return user
    }else{
        return null
    }
}

async function createUser({firstname, middlename, lastname, email, password, address, picture, role}){
    const userObj = {userId: uuidv4(), firstname, middlename, lastname, email, password, address, picture, role}
    const createStatus = await userDAO.createUser(userObj)
    if(createStatus){
        return userObj;
    }else{
        return null;
    }
}

module.exports = {findUserByEmailAndPassword,createUser}