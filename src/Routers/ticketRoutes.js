const express = require('express')
const ticketRouter = express.Router()
const {submitTicket} = require('../Controller/ticketController');
const { authenticateToken } = require('../Utils/jwt');

ticketRouter.post('/ticket',authenticateToken,submitTicket)

module.exports = {ticketRouter}