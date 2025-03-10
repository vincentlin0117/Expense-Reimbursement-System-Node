const {createLogger, transports, format, log} =require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp,level,message})=>{
            return `${timestamp} [${level}]: ${message}`
        })
    ),
    transports:[
        new (transports.Console)(),
        new (transports.File)({filename:'logfile.log'})
    ]
});

module.exports = {
    logger
}