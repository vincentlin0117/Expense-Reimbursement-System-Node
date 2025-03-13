const ticketDAO = require('../Repository/ticketDAO')
const userService = require('./userService')
const {v4:uuidv4} = require('uuid')

async function createTicket(userId,{description,type,amount}) {
    if((await userService.findUserById(userId)).success){
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
            return {success:true,ticket:ticket}
        }else{
            return {success:false, message:'Failed to create ticket'}
        }
    }else{
        return {success:false, message:'User doesnt exist'};
    }
    
}

module.exports = {createTicket}