const Warehouse = require("../models/warehouse.model");
const mainFile=require('../app');
exports.createWarehouse=async (req, res, next) => {
    try {
        const isexist = await Warehouse.findOne({ where: {warehouseID: req.body.warehouseID }})
        const {warehouseID,country,city,exactLocation,contactPhone,conatactPerson,alternativeContact,cutofTimeType,cutoffTime}=req.body
        if (!isexist) {
            const hub = await Warehouse.create({
                warehouseID,
                country,
                city,
                exactLocation,
                cutofTimeType,
                cutoffTime,
                conatactPerson,
                contactPhone,
                alternativeContact
            })
            mainFile.cutoffTimeCall()
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
//get warehouse
exports.getWarehouse=async(req,res,next)=>{
    try{
        if(req.user.role===process.env.ADMIN)
        {
          const warehouse = await Warehouse.findAll()
          return res.json(warehouse)
        }
        else{
          const id=req.user.hubID
          const warehouse= await Warehouse.findAll({where:{_id:id}})
          return res.json(warehouse)
        }
    }

    catch(error){
  next(error)
    }
  }
  exports.adjustCutoffTime = async (req, res, next) => {
    try {
      const warehouseID=req.user.hubID
      const cutoffTime=req.body.cutoffTime
  const updated=await Warehouse.update({ 
    cutoffTime
  },{ where: { _id:warehouseID}})
   mainFile.cutoffTimeCall()
   return res.json(updated)
    }
    catch(error) {
        next(error)
      }
  }
//change status
exports.updateWarehouseStatus = async (req, res, next) => {
    try {
      const {status}=req.body
      const id=req.params.id;
     await Warehouse.update(
      {status:status},
      { where: { _id: id } })
     res.json({success:true})
    }
    catch(error) {
      next(error)
    }
  };
//get city
exports.getHub=async(req,res,next)=>{
    try{
        const hub = await Warehouse.findAll()
        res.json(hub)
    }
    catch(error){
  next(error)
    }
  }

  exports.updateWarehouse=async(req,res,next)=>{
    try{
        const id=req.params.id;
       const {warehouseID,country,city,exactLocation,cutofTimeType,cutoffTime,status,conatactPerson,contactPhone,alternativeContact}=req.body
        const updated = await Warehouse.update(
            {
                warehouseID,
                country,
                city,
                exactLocation,
                cutofTimeType,
                cutoffTime,
                status,
                conatactPerson,
                contactPhone,
                alternativeContact
            },
            { where: { _id: id } })
            mainFile.cutoffTimeCall()
            return res.json(updated) 
    }

    catch(error){
        next(error)
          }
    }
