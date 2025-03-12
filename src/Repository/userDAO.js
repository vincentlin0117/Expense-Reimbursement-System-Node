const {DynamoDBClient} = require('@aws-sdk/client-dynamodb')
const {DynamoDBDocumentClient,GetCommand,PutCommand,DeleteCommand,ScanCommand} = require('@aws-sdk/lib-dynamodb')
const { logger } = require('../Utils/logger')

const client = new DynamoDBClient({region:'us-east-1'})

const documentClient = DynamoDBDocumentClient.from(client)

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

async function getUserById(id){
    const command = new GetCommand({
        TableName: 'User',
        Key: {id}
    })
    try{
        return (await documentClient.send(command)).Item
    }catch(err){
        logger.error(err)
        return null
    }
}

async function getUserByEmailAndPassword(email,password) {
    const command = new ScanCommand({
        TableName: 'User',
        FilterExpression: "email = :email AND password = :password",
        ExpressionAttributeValues:{
            ":email": email,
            ":password": password
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

module.exports = {documentClient,getAllUser, getUserById, createUser, deleteUser, getUserByEmailAndPassword}