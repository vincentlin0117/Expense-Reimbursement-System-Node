const authorizeRole = (expectedRole)=>{
    return (req,res,next) =>{
        if(req.locals.tokenDetail?.role != expectedRole){
            res.status(401).json({message: "Employee cannot access this"})
        }else{
            next()
        }
    }

}

module.exports = {authorizeRole}