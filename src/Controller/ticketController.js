const express = require('express')

const ticketController = express.Router()

ticketController.get('/ticket',(req,res) =>{
    res.status(200).send(JSON.stringify({message: "Ticket"}))
}) 

module.exports = {
    ticketController
}