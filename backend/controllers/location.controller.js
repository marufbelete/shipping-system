const Location = require("../models/location.model");

//for all
exports.createLocation=async (req, res, next) => {
    try {
        const {country,city,specialName}=req.body
            const location = await Location.create({
               country,
               city,
               specialName
            })

            return res.json(location)
    }

  catch(error) {
       next(error)
  }
}
//bulk create location
//bulk create shipment
exports.createLocations=async (req, res, next) => {
    try {
        const data=req.body
        const bulk= data.map(e => ({ 
            city:e.city,
            country:e.country,
            specialName:e.specialName,

        }));
        const location= await Location.bulkCreate(bulk)
  
            return res.json(location)
    }
  
  catch(error) {
       next(error)
  }
  }  

//get city
exports.getLocation=async(req,res,next)=>{
    try{
        const location = await Location.findAll()
        res.json(location)
    }
    catch(error){
  next(error)
    }
  }

//update location info
exports.updateLocation=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const {country,city,specialName}=req.body
        const newcity = await Location.update(
            {
                country,
                city,
                specialName 
            },
            { where: { _id: id } })
       
        res.json(newcity) 
    }

    catch(error){
        next(error)
          }
    }

// for admin delete
exports.deleteLocation = async (req, res, next) => {
    try {
        const id=req.params.id;
        await Location.destroy({ where: { _id: id } });

        res.json("city deleted succssfully")

    }
    catch(error) {
        next(error)
    }
}