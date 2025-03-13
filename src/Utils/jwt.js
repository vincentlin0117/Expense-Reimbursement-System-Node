const jwt = require('jsonwebtoken');
const { logger } = require('./logger');
const key = require('dotenv').config('./src/.env').parsed.JWT_SECRET

async function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        res.status(403).json({message:"Forbidden Access"})
    }else{
        const tokenDetail = await decodeJWT(token)
        req.locals ={tokenDetail:tokenDetail}
        next()
    }
}

async function decodeJWT(token){
    try{
        const decodedToken = await jwt.verify(token,key)
        return decodedToken
    }catch(err){
        logger.error(err)
    }
}

module.exports = {authenticateToken}