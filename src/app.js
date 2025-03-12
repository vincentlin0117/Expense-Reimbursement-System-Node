const express = require('express')
const { logger } = require('./Utils/logger')
const {userController} = require('./Controller/userController');
const {ticketController} = require('./Controller/ticketController');
const HTTP_PORT = 8000

const app = express()

app.use(express.json());
app.use(loggerMiddleware)
app.use('/', userController);
app.use('/', ticketController);

function loggerMiddleware(req,res,next){
    logger.info(`[${req.method}]: ${req.url}`)
}

app.listen(HTTP_PORT,()=>{
    logger.info(`Server is listening on http://localhost:${HTTP_PORT}`)
})
