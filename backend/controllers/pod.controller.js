const Pod = require("../models/pod.model");
const Sequalize=require('sequelize')
const Location = require("../models/location.model");
const sharp=require("sharp")
const fs=require("fs");
//for more than one file req.file will be chnaged in to req.files
exports.createPod=async (req, res, next) => {
    try {
      const userid=req.user.sub;
        if(!!req.mimetypeError)
        {
            const error = new Error(req.mimetypeError)
            error.statusCode = 400
            throw error;
        }
    const imgurl=[]
    if (req.files.length > 0)
    {
        if (!fs.existsSync("./images")){
            fs.mkdirSync("./images");
        }
  for(let f=0;f<req.files.length;f++)
  {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const imagetype=(req.files[f].mimetype).split("/")[1];
    const path=req.files[f].originalname;
    const fullpath=uniquePrefix+'-'+path;
           sharp(req.files[f].buffer)
          .resize({ width:600, fit: 'contain', })
    .toFormat(imagetype)
    .toFile(`./images/${fullpath}`);
    imgurl.push(fullpath)
 }

 const newpod = await Pod.create({
    shipmentID:req.body.shipmentID,
    customerID:req.body.customerID,
    description:req.body.description,
    imageUrl:imgurl,
    userId:userid
    
  })
  
     res.json(newpod)
    }
  else{
    const error = new Error("you should have an attachment")
    error.statusCode = 400
    throw error;
  }
    }
  catch(error) {
    next(error)
  }
}

//get my pod
exports.getMyPod=async(req,res,next)=>{
  try{
    const userid=req.user.sub;
      const pods = await Pod.findAll({where:{userId:userid}})
      res.json(pods)
  }
  catch(error){
next(error)
  }
}
