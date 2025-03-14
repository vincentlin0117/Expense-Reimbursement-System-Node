const express = require('express')
const { logger } = require('./Utils/logger')
const {ticketRouter} = require('./Routers/ticketRoutes');
const {userRouter} = require('./Routers/userRoutes');
const { authenticateToken } = require('./Middleware/AuthTokenMiddleware');
const {loggerMiddleware} = require('./Middleware/loggerMiddleware')
const HTTP_PORT = 8000

const app = express()

app.use(express.json());
app.use(loggerMiddleware)
app.use('/user', userRouter);
app.use('/ticket',authenticateToken, ticketRouter);

app.listen(HTTP_PORT,()=>{
    logger.info(`Server is listening on http://localhost:${HTTP_PORT}`)
})
