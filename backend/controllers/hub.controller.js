const Hub = require("../models/hub.model");

//for all
exports.createHub=async (req, res, next) => {
    try {
        const isexist = await Hub.findOne({ where: {  hubID: req.body.hubID }})

        if (!isexist) {
            // save non exsting location
            const hub = await Hub.create({
                hubID:req.body.hubID,
                hubAddress:req.body.hubAddress,
                hubName:req.body.hubName
            })
            return res.json(hub)
        }
        else {
            const error = new Error("This hub already exist")
            error.statusCode = 400
            throw error;
        }
    }

  catch(error) {
       next(error)
  }
}

//get city
exports.getHub=async(req,res,next)=>{
    try{
        const hub = await Hub.findAll()
        res.json(hub)
    }
    catch(error){
  next(error)
    }
  }

//update location info
exports.updateHub=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const hubname=req.body.hubName
        const hubaddress=req.body.hubAddress

        const newcity = await Hub.update(
            {
                hubName: hubname,
                hubAddress:hubaddress
            },
            { where: { _id: id } })
       
        res.json(newcity) 
    }

    catch(error){
        next(error)
          }
    }

// for admin delete
exports.deleteHub = async (req, res, next) => {
    try {
        const id=req.params.id;
        await Hub.destroy({ where: { _id: id } });

        res.json("hub deleted succssfully")

    }
    catch(error) {
        next(error)
    }
}