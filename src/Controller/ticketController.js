const express = require('express')
const ticketService = require('../Service/ticketService')
const ticketController = express.Router()

ticketController.get('/ticket',(req,res) =>{
    res.status(200).send(JSON.stringify({message: "Ticket"}))
}) 

ticketController.post('/ticket', async (req,res)=>{
    if(!req.body.userId || !req.body.type){
        return res.status(400).json({message: "Invalid resolver ID, user ID, or ticket type"})
    }
    const ticket = await ticketService.createTicket(req.body)
    
    if(ticket){
        res.status(201).json({message:"Ticket created",ticket:ticket})
    }else{
        res.status(400).json({message:"Failed to create ticket. Please check your inputs."})
    }
})

module.exports = {
    ticketController
}