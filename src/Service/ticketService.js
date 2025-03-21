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
            status: "Pending",
            createDate: (new Date()).toISOString().split('T')[0]
        }

        const result = await ticketDAO.createTicket(ticket)

        if(result){
            return {success:true,ticket:ticket}
        }else{
            return {success:false,code:500, message:'Failed to create ticket'}
        }
    }else{
        return {success:false,code:400, message:'User doesnt exist'};
    }
    
}

async function  getTicketsByStatus({status}) {
    const tickets = await ticketDAO.getAllTicketByStatus(status)

    if(tickets){
        return {success:true,tickets:tickets}
    }else{
        return {success:false,code:500, message: `Failed to get tickets with status: ${status}`}
    }
}

async function getAllTicketsByUserId(userId, ticketType = null){
    const tickets = await ticketDAO.getAllTicketsByUserId(userId,ticketType)
    
    if(tickets){
        const sortedTickets = tickets.sort((a, b) => {
            const dateComparison = new Date(b.createDate) - new Date(a.createDate);
            if (dateComparison !== 0) return dateComparison;
        
            const statusOrder = ['Pending', 'Approve', 'Deny'];
            return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        });

        return {success:true,tickets:sortedTickets}
    }else{
        return {success: false, code:500, message:"Failed to get tickets"}
    }
}

async function updateTicketStatus(userId,{ticketId,status}) {
    const ticket = await ticketDAO.getTicketByTicketId(ticketId)
    if(ticket){
        if(ticket.status == 'Pending'){
            if(userId != ticket.userId){
                const result = await ticketDAO.updateTicket(ticketId,{resolver:userId,status})
                if(result){
                    ticket.status = status;
                    ticket.resolver = userId;
                    return {success:true, ticket:ticket}
                }else{
                    return {success:false, code:500, message: "Failed to update ticket"}
                }
            }else{
                return {success: false, code:401, message: "Cannot Approve/Deny own ticket"}
            }
        }else{
            return {success:false, code:400, message: "Ticket status isnt Pending, cannot be change"}
        }
    }else{
        return {success:false, code:400, message: "Ticket does not exist"}
    }
}

module.exports = {
    createTicket, 
    getTicketsByStatus, 
    getAllTicketsByUserId,
    updateTicketStatus
}