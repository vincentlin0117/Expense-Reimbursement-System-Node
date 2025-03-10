const express = require('express')
const { logger } = require('./Utils/logger')
const {userController} = require('./Controller/userController');
const {ticketController} = require('./Controller/ticketController');
const HTTP_PORT = 8000

const app = express()

app.use('/', userController);
app.use('/', ticketController);

app.listen(HTTP_PORT,()=>{
    logger.info(`Server is listening on http://localhost:${HTTP_PORT}`)
})
