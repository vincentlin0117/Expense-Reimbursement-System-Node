const userDAO = require('../Repository/userDAO')
const {v4:uuidv4} = require('uuid');

async function findUserByNameAndPassword(email,password) {
    const user = await userDAO.getUserByUsernameAndPassword(email,password)
    if(user.userId){
        return user
    }else{
        return null
    }
}

async function createUser({fisrtname, middlename, lastname, email, password, address, picture, role}){
    const userObj = {userId: uuidv4(), fisrtname, middlename, lastname, email, password, address, picture, role}
    const createStatus = await userDAO.createUser(userObj)
    if(createStatus){
        return userObj;
    }else{
        return null;
    }
}

module.exports = {findUserByNameAndPassword,createUser}