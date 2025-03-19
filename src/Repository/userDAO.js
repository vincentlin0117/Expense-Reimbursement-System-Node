const {GetCommand,PutCommand,QueryCommand} = require('@aws-sdk/lib-dynamodb')
const { logger } = require('../Utils/logger')

const {documentClient} = require('../Database/database')

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
    const command = new QueryCommand({
        TableName: 'User',
        IndexName: 'usernameIndex',
        KeyConditionExpression: "username = :username",
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

module.exports = {getUserById, createUser, getUserByUsername}