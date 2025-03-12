const ticketDAO = require('../Repository/ticketDAO')
const userService = require('./userService')
const {v4:uuidv4} = require('uuid')

async function createTicket({userId,description,type,amount}) {
    if(await userService.findUserById(userId)){
        const ticket = {
            ticketId: uuidv4(),
            userId: userId,
            description:description,
            type: type,
            amount:amount,
            status: "pending"
        }

        const result = await ticketDAO.createTicket(ticket)

        if(result){
            return ticket
        }else{
            return null
        }
    }else{
        return null;
    }
    
}

module.exports = {createTicket}