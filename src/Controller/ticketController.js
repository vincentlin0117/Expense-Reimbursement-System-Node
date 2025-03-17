const ticketService = require('../Service/ticketService')
const joi = require('joi')

const submitTicket = async (req,res)=>{
    const ticketSchema = joi.object({
        description: joi.string().required(),
        type: joi.string().required(),
        amount: joi.number().min(0).required()
    })

    const {error, value} = ticketSchema.validate(req.body);

    if(error){
        const messages = []

        error.details.forEach(detail =>{
            const cleanMsg = detail.message.replace(/"/g,'')
            messages.push(cleanMsg)
        })

        return res.status(400).json({message:messages})
    }
    const ticket = await ticketService.createTicket(req.locals.tokenDetail?.userId,value)
    if(ticket.success){
        res.status(201).json({message:"Ticket created",ticket:ticket.ticket})
    }else{
        res.status(ticket.code).json({message:ticket.message})
    }
}

const getTicketsByStatus = async (req,res) =>{
    const statusSchema = joi.object({
        status: joi.string().valid('Pending','Approve','Deny').required()
    })

    const {error,value} = statusSchema.validate(req.query);

    if(error){
        return res.status(400).json({message:error.details[0].message.replace(/"/g,'')})
    }
    const tickets = await ticketService.getTicketsByStatus(value)

    if(tickets.success){
        res.status(200).json(tickets.tickets)
    }else{
        res.status(tickets.code).json({message:tickets.message})
    }
}

const getPreviousTickets = async (req,res)=>{
    const prevTickets = await ticketService.getAllTicketsByUserId(req.locals.tokenDetail.userId)

    if(prevTickets.success){
        res.status(200).json(prevTickets.tickets)
    }else{
        res.status(prevTickets.code).json({message:prevTickets.message})
    }
}

const updateTicketStatus = async(req,res)=>{
    const updateTicketSchema = joi.object({
        ticketId: joi.string().required(),
        status: joi.string().valid('Approve','Deny').required()
    })
    
    const {error,value} = updateTicketSchema.validate({ticketId:req.params.ticketId,status:req.body.status});
    
    if(error){
        const messages = []

        error.details.forEach(detail =>{
            const cleanMsg = detail.message.replace(/"/g,'')
            messages.push(cleanMsg)
        })

        return res.status(400).json({message:messages})
    }
    const ticket = await ticketService.updateTicketStatus(req.locals.tokenDetail.userId,value)
    
    if(ticket.success){
        res.status(200).json({message:"Updated successfully", updatedTicket:ticket.ticket})
    }else{
        res.status(ticket.code).json({message:ticket.message})
    }
}

module.exports = {
    submitTicket, 
    getTicketsByStatus, 
    getPreviousTickets, 
    updateTicketStatus 
}