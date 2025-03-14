const jwt = require('jsonwebtoken');
const { logger } = require('../Utils/logger');
const key = require('dotenv').config('./src/.env').parsed.JWT_SECRET

async function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        res.status(403).json({message:"Forbidden Access"})
    }else{
        const tokenDetail = await decodeJWT(token)
        
        if(tokenDetail){
            req.locals ={tokenDetail:tokenDetail}
            next()
        }else{
            res.status(403).json({message:"Forbidden Access: Invalid Token"})
        }
    }
}

async function decodeJWT(token){
    try{
        const decodedToken = await jwt.verify(token,key)
        return decodedToken
    }catch(err){
        logger.error(err)
        return null;
    }
}

module.exports = {authenticateToken}