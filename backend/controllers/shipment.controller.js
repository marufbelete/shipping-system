const Shipment = require("../models/shipment.model");
const ShortUniqueId = require('short-unique-id');
const Sequelize=require('sequelize');
const sequalize = require("../util/database");
const fs =require('fs')
const sharp=require('sharp')
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const {Op}=require('sequelize');
//for all
exports.createShipment=async (req, res, next) => {
    try {
        const uid = new ShortUniqueId({ length: 12 });
        let imgurl
        if (req.file)
      {
          if (!fs.existsSync("./images")){
              fs.mkdirSync("./images");
          }
  
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const imagetype=(req.file.mimetype).split("/")[1];
      const path=req.file.originalname;
      const fullpath=uniquePrefix+'-'+path;
             sharp(req.file.buffer)
            .resize({ width:600, fit: 'contain', })
      .toFormat(imagetype)
      .toFile(`${process.cwd()}/images/${fullpath}`);
      imgurl=fullpath
  }
  
            const {pickupDate,customerID,locationAddress,orgDeliveryDate,actualReceivedDate}=req.body
            if(pickupDate&&customerID&&locationAddress&&orgDeliveryDate&&actualReceivedDate)
            {
              if(req.user.role!=='1111')
              {
                const hubIDs=req.user.hubID
                const shipmentID = await Shipment.create({
                  shipmentID: uid(),
                  image:imgurl,
                  hubID:hubIDs,
                  ...req.body
              })
              return res.json(shipmentID) 
              }
            const shipmentID = await Shipment.create({
                shipmentID: uid(),
                image:imgurl,
                ...req.body
            })
            return res.json(shipmentID) 
          }
          else
          {
            const error = new Error("Some filed are missing")
            error.statusCode = 400
            throw error;
          }
    }    
  catch(error) {
       next(error)
  }
}
//bulk create shipment
exports.createShipments=async (req, res, next) => {
  try {
      const data=req.body
      const uid = new ShortUniqueId({ length: 12 });
      const bulk= data.map(e => ({ 
        shipmentID:uid(),
        deliveryETA:e.deliveryETA,
        hubID:e.hubID,
        AWB:e.AWB,
        locationAddress:e.pickupLocation,
        pickupDate:e.pickupDate,
        customerID:e.customerID,
        CODAmount:e.CODAmount,
        pickupLocation:e.pickupLocation,
        orgDeliveryDate:e.orgDeliveryDate,
        actualReceivedDate:e.actualReceivedDate,
    }));
          // save non exsting shipment
          const shipmentID = await Shipment.bulkCreate(bulk)
          return res.json(shipmentID)
  }

catch(error) {
     next(error)
}
}
//update proof doc
exports.updateProofDoc=async (req, res, next) => {
  try {
      const id=req.params.id
      let imgurl
      if (req.file)
    {
        if (!fs.existsSync(`${process.cwd()}/images`)){
            fs.mkdirSync(`${process.cwd()}/images`);
        }
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const imagetype=(req.file.mimetype).split("/")[1];
    const path=req.file.originalname;
    const fullpath=uniquePrefix+'-'+path;
           sharp(req.file.buffer)
          .resize({ width:600, fit: 'contain', })
    .toFormat(imagetype)
    .toFile(`${process.cwd()}/images/${fullpath}`);
    imgurl=fullpath
}
      await Shipment.update(
      {image:imgurl},
      { where: { _id: id } })
     return res.json("Done") 
  }    
catch(error) {
     next(error)
}
}

//get shipment
exports.getShipment=async(req,res,next)=>{
    try{
        const shipment = await Shipment.findAll()
       return res.json(shipment)
    }
    catch(error){
  next(error)
    }
  }
 
  // analysis and assign
  exports.analysisAndAssign=async(req,res,next)=>{
    let transaction;
    try {
      transaction = await sequalize.transaction();
      let hubID={}
      const hub=req.user.role!=='1111'?req.user.hubID:req.body.ananlysisHub
      const driverExcluded=req.body.drivers
      if(req.user.role==='1111'&&hub=='10')
      {
        hubID={}
      }
      else{
        hubID.hubID=hub
      }
      const inDriver=await User.findAll({where:{userType:process.env.DRIVER,...hubID,isActive:true,_id: {[Op.notIn]:driverExcluded}},attribute:{include:['_id']},transaction });
      let includeDriver=[...inDriver]
      //select drivernot assign shippment
      const shipments=await Shipment.findAll({where:{driverAssigned:null,...hubID},attribute:{include:['_id']},transaction});
      const promises = shipments.map(shipment=>{
        if(includeDriver.length===0)
        {
          includeDriver=[...inDriver]
        }
        const ass_driver=includeDriver.splice(Math.floor(Math.random()*includeDriver.length), 1)
        return Shipment.update({driverAssigned:ass_driver[0]._id}, { where: { _id: shipment._id,...hubID},transaction});
      }) 
      await Promise.all(promises);
      await transaction.commit();
      return res.json('done')
        }
        catch(error) {
          if (transaction) await transaction.rollback();
          next(error)
          }
  }
  //collect cod
  exports.collectCOD=async(req,res,next)=>{
      let transaction;
      try{
      transaction = await sequalize.transaction();
      const driver_id=req.body._id
      const collector=req.user.sub
      await Transaction.create({
        hubID:req.body.hubID,
        collectedBy:collector,
        CODAmount:req.body.balance,
        currency:req.body.currency,
        driverAssigned:req.body._id,
    })
      const collect= await Shipment.findAll({where:{driverAssigned:driver_id},transaction})
      const promises=collect.map(shipment=>{
            return Shipment.update({isCODCollected:true}, { where: { _id: shipment._id},transaction});
            })
      await Promise.all(promises)
      await transaction.commit();
      return res.json('done')
     }
     catch(error){
      if (transaction) await transaction.rollback();
      next(error)
     }
    }

//
exports.getShipmentByStatus=async(req,res,next)=>{
  try{
   const canceled=req.query.canceled
   const returned=req.query.returned
   const onprogress=req.query.onprogress
   const delivered=req.query.delivered
   const filter=[]
   delivered&&filter.push(stateprocess.env.SHIPMENTDELIVERED)
   canceled&&filter.push(process.env.SHIPMENTCANCELED)
   onprogress&&filter.push(process.env.SHIPMENTOUTFORDELIVERY)
   returned&&filter.push(process.env.SHIPMENTRETURNED)
      const shipment = await Shipment.findAll({where:{shipmentStatus:{[Sequelize.Op.in]:filter}}})
     return res.json(shipment)
  }
  catch(error){
   next(error)
  }
}
//dispatch update
exports.updateAssignShipment = async (req, res, next) => {
  try {
    const id=req.params.id
    const {actualReceivedDate,pickupDate,hubID,deliveryETA,shipmentSubStatus}=req.body
const updated=await Shipment.update({ 
shipmentSubStatus,
actualReceivedDate,
pickupDate,
hubID,
deliveryETA
},{ where: { _id:id}})
 return res.json(updated)
  }
  catch(error) {
      next(error)
    }
}
  // update shipment status
exports.updateShipment = async (req, res, next) => {
    try {
      const id=req.params.id
      const customerID=req.body.customerID
      const shipmentStatus=req.body.shipmentStatus
      const CODAmount=req.body.CODAmount
  const updated=await Shipment.update({ 
  shipmentStatus,
  customerID,
  CODAmount
  },{ where: { _id:id}})
   return res.json(updated)
    }
    catch(error) {
        next(error)
      }
}

exports.assignDriver = async (req, res, next) => {
  try {
    const shipid=req.params.id
    const driverid=req.body.driverID
const updated=await Shipment.update({ 
 driverAssigned:driverid
},{ where: {_id:shipid}})
 return res.json(updated)
  }
  catch(error) {
      next(error)
    }
}
exports.assignMultipleDriver = async (req, res, next) => {
  try {
const datas=req.body
const promises = datas.map(data=>{
  const {driverAssigned}=data
   return Shipment.update({driverAssigned}, { where: { _id: data._id } });
}) 
await Promise.all(promises);
 return res.json('done')
  }
  catch(error) {
      next(error)
    }
}
//delete shipment