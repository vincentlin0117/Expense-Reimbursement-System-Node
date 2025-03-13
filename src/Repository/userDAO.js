const {GetCommand,PutCommand,DeleteCommand,ScanCommand} = require('@aws-sdk/lib-dynamodb')
const { logger } = require('../Utils/logger')

const {documentClient} = require('../Database/database')

async function getAllUser(){
    const command = new ScanCommand({
        TableName: 'User'
    })
    try{
        return (await documentClient.send(command)).Items 
    }catch(err){
        logger.error(err)
        return null
    }
}

async function getUserById(userId){
    const command = new GetCommand({
        TableName: 'User',
        Key: {userId}
    })

    try{
        return (await documentClient.send(command)).Item
    }catch(err){
        logger.error(err)
        return null
    }
}

async function getUserByUsername(username) {
    const command = new ScanCommand({
        TableName: 'User',
        FilterExpression: "username = :username",
        ExpressionAttributeValues:{
            ":username": username
        }
    })

    try{
        return (await documentClient.send(command)).Items?.[0]
    }catch(err){
        logger.error(err)
        return null
    }
}

async function createUser(user) {
    const command = new PutCommand({
        TableName: 'User',
        Item: user
    })

    try{
        await documentClient.send(command);
        return true;
    }catch(err){
        logger.error(err)
        return false;
    }
}

async function deleteUser(id) {
    const command = new DeleteCommand({
        TableName: 'User',
        Key: {id}
    })
    
    try{
        await documentClient.send(command)
        return true;
    }catch(err){
        logger.error(err)
        return false;
    }
}

module.exports = {getAllUser, getUserById, createUser, deleteUser, getUserByUsername}