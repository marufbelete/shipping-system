const Shipment = require("../models/shipment.model");
const ShortUniqueId = require('short-unique-id');
const Sequelize=require('sequelize');

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
        const counts = await Shipment.count({where:{shipmentStatus:{[Sequelize.Op.in]:filter}}})
       return res.json(counts)
    }
    catch(error){
     next(error)
    }
  }