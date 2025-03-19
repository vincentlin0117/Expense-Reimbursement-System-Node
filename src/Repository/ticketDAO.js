const {GetCommand,PutCommand,QueryCommand,UpdateCommand} = require('@aws-sdk/lib-dynamodb')

const {documentClient} = require('../Database/database');
const { logger } = require('../Utils/logger');

async function createTicket(ticket) {
    const command = new PutCommand({
        TableName: 'Ticket',
        Item: ticket
    })

    try{
        await documentClient.send(command)
        return true;
    }catch(err){
        logger.error(err)
        return false;
    }
}

async function getAllTicketByStatus(status) {
    const command = new QueryCommand({
        TableName: 'Ticket',
        IndexName: 'statusIndex',
        KeyConditionExpression: '#status = :status',
        ExpressionAttributeNames:{
            "#status" : 'status'
        },
        ExpressionAttributeValues: {
            ":status":status
        }
    })

    try{
        return (await documentClient.send(command)).Items
    }catch(err){
        logger.error(err)
        return null
    }
}

async function getAllTicketsByUserId(userId) {
    const command = new QueryCommand({
        TableName: 'Ticket',
        IndexName: 'userIdIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ":userId": userId
        }
    })

    try{
        return (await documentClient.send(command)).Items
    }catch(err){
        logger.error(err)
        return null
    }
}

async function getTicketByTicketId(ticketId) {
    const command = new GetCommand({
        TableName:'Ticket',
        Key: {ticketId}
    })

    try{
        return (await documentClient.send(command)).Item
    }catch(err){
        logger.error(err)
        return null
    }
}

async function updateTicket(ticketId,updateFields) {
    const updateExpression =[];
    const attributeNames = {};
    const attributeValues = {};

    Object.keys(updateFields).forEach(field => {
        updateExpression.push(`#${field} = :${field}`)
        attributeNames[`#${field}`] = field;
        attributeValues[`:${field}`] = updateFields[field]
    });

    const command = new UpdateCommand({
        TableName:'Ticket',
        Key: {ticketId:ticketId},
        UpdateExpression: `SET ${updateExpression.join(', ')}`,
        ExpressionAttributeNames:attributeNames,
        ExpressionAttributeValues:attributeValues
    })

    try{
        await documentClient.send(command)
        return true
    }catch(err){
        logger.error(err)
        return null
    }
}

module.exports = {
    createTicket, 
    getAllTicketByStatus, 
    getAllTicketsByUserId,
    getTicketByTicketId,
    updateTicket
}