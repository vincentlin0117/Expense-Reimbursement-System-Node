const {GetCommand,PutCommand,DeleteCommand,ScanCommand} = require('@aws-sdk/lib-dynamodb')

const {documentClient} = require('../Database/database')

async function createTicket(ticket) {
    const command = new PutCommand({
        TableName: 'Ticket',
        Item: ticket
    })
    try{
        await documentClient.send(command)
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
}

async function  getAllTicketByUser(userId) {
    const command = new ScanCommand({
        TableName:'Ticket',
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ':userId': userId
        }
    })
    try{
        return (await documentClient.send(command)).Items
    }catch(err){
        console.log(err)
        return null
    }
}
async function getAllTicket() {
    const command = new ScanCommand({
        TableName: 'Ticket'
    })
    try{
        return (await documentClient.send(command)).Items
    }catch(err){
        console.log(err)
        return null
    }
}


module.exports = {createTicket, getAllTicketByUser, getAllTicket}