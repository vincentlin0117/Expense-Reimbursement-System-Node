const express = require('express')
const { logger } = require('./Utils/logger')
const {ticketRouter} = require('./Routers/ticketRoutes');
const {userRouter} = require('./Routers/userRoutes');

const HTTP_PORT = 8000

const app = express()

app.use(express.json());
app.use(loggerMiddleware)
app.use('/', userRouter);
app.use('/', ticketRouter);

function loggerMiddleware(req,res,next){
    logger.info(`[${req.method}]: ${req.url}`)
    next();
}

app.listen(HTTP_PORT,()=>{
    logger.info(`Server is listening on http://localhost:${HTTP_PORT}`)
})
