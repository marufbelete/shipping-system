
exports.errorHandler = (err,req,res,next) =>{
console.log('inside error')
!!err.statusCode? err.statusCode : err.statusCode=500;
    return res.status(err.statusCode).json({message:err.statusCode===500?"Unknown Error Occured":err.message,status:false});
}