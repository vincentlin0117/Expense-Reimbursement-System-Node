const express = require('express')
const ticketRouter = express.Router()
const {submitTicket, getTicketsByStatus,getPreviousTickets, updateTicketStatus} = require('../Controller/ticketController');
const {authorizeRole} = require('../Middleware/AuthRoleMiddleware')

ticketRouter.post('/',submitTicket)
ticketRouter.get('/ticket', authorizeRole('Manager'), getTicketsByStatus)
ticketRouter.get('/user', getPreviousTickets)
ticketRouter.put('/ticket/:ticketId/status',authorizeRole('Manager'), updateTicketStatus)

module.exports = {ticketRouter}