const authorizeRole = (expectedRole)=>{
    return (req,res,next) =>{
        if(req.locals.tokenDetail?.role != expectedRole){
            res.status(403).json({message: "Employee cannt not process request"})
        }else{
            next()
        }
    }

}

module.exports = {authorizeRole}