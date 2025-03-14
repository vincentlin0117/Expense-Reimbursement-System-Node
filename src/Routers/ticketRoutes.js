const express = require('express')
const ticketRouter = express.Router()
const {submitTicket, getTicketsByStatus,getPreviousTickets, updateTicketStatus} = require('../Controller/ticketController');
const {authorizeRole} = require('../Middleware/AuthRoleMiddleware')

ticketRouter.post('/',submitTicket)
ticketRouter.get('/', authorizeRole('Manager'), getTicketsByStatus)
ticketRouter.get('/user', getPreviousTickets)
ticketRouter.put('/:ticketId/updateStatus',authorizeRole('Manager'), updateTicketStatus)

module.exports = {ticketRouter}