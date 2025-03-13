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
        res.status(400).json({message:ticket.message})
    }
}

module.exports = {
    submitTicket
}