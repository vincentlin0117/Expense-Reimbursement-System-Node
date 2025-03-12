const express = require('express')
const ticketRouter = express.Router()
const {submitTicket} = require('../Controller/ticketController');

ticketRouter.post('/ticket',submitTicket)

module.exports = {ticketRouter}