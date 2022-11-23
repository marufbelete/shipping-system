const Location = require("../models/location.model");
const axios = require('axios')

//for all
exports.getOtp=async (req, res, next) => {
    try {
         const username=req.body.userName
         const number=req.body.numbers
         const sender=req.body.userSender
         const apikey=req.body.apiKey
         const msg=req.body.msg
         const msgencoding=req.body.msgEncoding
        const otp=await axios({
            url: 'https://www.msegat.com/gw/sendsms.php',
            method: 'post',
            data: {
                userName:username,
                numbers: number,
                userSender:sender,
                apiKey:apikey,
                msg:msg,
                msgEncoding:msgencoding
            }
          })
          res.json(otp.data)
        }
  catch(error) {
       next(error)
  }
}