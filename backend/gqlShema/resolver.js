const User = require("../models/user.model");
const Hub=require('../models/hub.model');
const Customer = require("../models/customer.model");
const Sequelize=require('sequelize');
const {Op}=require('sequelize');
const Transaction = require("../models/transaction.model");
const moment=require('moment');
const {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLTime
} = require("graphql-scalars");
const Shipment = require("../models/shipment.model");
const Location = require("../models/location.model");
const Warehouse = require("../models/warehouse.model");
let todayFilter
let weekFilter
let monthFilter
let yearFilter
let filter
const filterfunction=(now)=>{
  const today=now.toISOString().split('T')[0].split('-')
  todayFilter={[Op.and] :[Sequelize.where(Sequelize.fn('DAY', Sequelize.col('createdAt')), '=', today[2]),
  Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), '=', today[1]),     
  Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), '=', today[0])]}

  monthFilter={[Op.and] :[Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), '=', today[1]),     
  Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), '=', today[0])]}

  weekFilter={createdAt: {
    [Op.gte]: moment().subtract(7, 'days').toDate()
  } }
  
  yearFilter={[Op.and] :[Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), '=', today[0])]}
}


const resolvers={
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
Query:{
    getUser:async(parent,args)=>{
        const user = await User.findByPk(args._id)
        return user
    },
    Hub:async()=>{
      const hub = await Hub.findAll()
      return hub 
     },
    Location:async()=>{
      const hub = await Location.findAll()
      return hub 
     },
     getAllShipment:async(parent,args,context)=>{
      if(context.role===process.env.ADMIN)
      {
        return await Shipment.findAll({attributes: {exclude: ['count']}})
      }
      return await Shipment.findAll({where:{hubID:context.hubID},attributes: {exclude: ['count']}})
     },
     getAllDriver:async(parent,args,context)=>{
      if(context.role===process.env.ADMIN)
      {
      return await User.findAll({where:{userType:process.env.DRIVER}})
      }
      return await User.findAll({where:{userType:process.env.DRIVER,hubID:context.hubID}})

     },
     getAllWarehouse:async(parent,args,context)=>{
      if(context.role===process.env.ADMIN)
      {
      return await Warehouse.findAll()
      }
      else{
        return await Warehouse.findAll({where:{_id:context.hubID}})

      }
     },
     //report
     getAllShipmentCount:async(parent,args,context)=>{
      filterfunction(new Date())
      args.input.filter==='today'?filter=todayFilter:''
      args.input.filter==='week'?filter=weekFilter:''
      args.input.filter==='month'?filter=monthFilter:''
      args.input.filter==='year'?filter=yearFilter:''
      if(context.role===process.env.ADMIN)
      {
      const allshipment= await Shipment.findAll({attributes: {exclude: ['count']},where:{...filter}})
      const allshipments=allshipment.length
      const delivered=allshipment.filter(e=>e.shipmentStatus===process.env.SHIPMENTDELIVERED).length
      const canceled=allshipment.filter(e=>e.shipmentStatus===process.env.SHIPMENTCANCELED).length
      const onprogress=allshipment.filter(e=>e.shipmentStatus===process.env.SHIPMENTOUTFORDELIVERY).length
      const returned=allshipment.filter(e=>e.shipmentStatus===process.env.SHIPMENTRETURNED).length
      return {allshipments,delivered,canceled,onprogress,returned}
      }
      const hubID=context.hubID
      const allshipment= await Shipment.findAll({attributes: {exclude: ['count']},where:{...filter,hubID}})
      const allshipments=allshipment.length
      const delivered=allshipment.filter(e=>e.shipmentStatus===process.env.SHIPMENTDELIVERED).length
      const canceled=allshipment.filter(e=>e.shipmentStatus===process.env.SHIPMENTCANCELED).length
      const onprogress=allshipment.filter(e=>e.shipmentStatus===process.env.SHIPMENTOUTFORDELIVERY).length
      const returned=allshipment.filter(e=>e.shipmentStatus===process.env.SHIPMENTRETURNED).length
      return [{allshipments,delivered,canceled,onprogress,returned}]
     },
     //report
     getAllShipmentGroupByDriver:async(parent,args,context)=>{
      filterfunction(new Date())
      args.input.filter==='today'?filter=todayFilter:''
      args.input.filter==='week'?filter=weekFilter:''
      args.input.filter==='month'?filter=monthFilter:''
      args.input.filter==='year'?filter=yearFilter:''
      if(context.role===process.env.ADMIN)
      {
      const result= await Shipment.findAll({group: ['driverAssigned', 'shipmentStatus'], attributes: ['driverAssigned','shipmentStatus',[Sequelize.fn('COUNT', 'driverAssigned'), 'count']],where:{shipmentStatus:{[Sequelize.Op.in]:[process.env.SHIPMENTDELIVERED,process.env.SHIPMENTOUTFORDELIVERY]},...filter}})
      return result;
      }
      const hubID=context.hubID
      const result= await Shipment.findAll({group: ['driverAssigned', 'shipmentStatus'], attributes: ['driverAssigned','shipmentStatus',[Sequelize.fn('COUNT', 'driverAssigned'), 'count']],where:{...filter,hubID,shipmentStatus:{[Sequelize.Op.in]:[process.env.SHIPMENTDELIVERED,process.env.SHIPMENTOUTFORDELIVERY]}}})
      return result;
     },

     //report
     getAllShipmentGroupByDate:async(parent,args,context)=>{
      filterfunction(new Date())
      args.input.filter==='today'?filter=todayFilter:''
      args.input.filter==='week'?filter=weekFilter:''
      args.input.filter==='month'?filter=monthFilter:''
      args.input.filter==='year'?filter=yearFilter:''
      if(context.role===process.env.ADMIN)
      {
      const result= await Shipment.findAll({group: ['shipmentStatus',Sequelize.fn('DAY',Sequelize.col('createdAt'))], attributes: ['createdAt','shipmentStatus',[Sequelize.fn('COUNT', 'shipmentStatus'), 'count']],where: {
        ...filter
      }
    })
      return result;
  }
  const hubID=context.hubID
  const result= await Shipment.findAll({group: ['shipmentStatus',Sequelize.fn('DAY',Sequelize.col('createdAt'))], attributes: ['createdAt','shipmentStatus',[Sequelize.fn('COUNT', 'shipmentStatus'), 'count']],where: {
    ...filter,hubID
  }
})
  return result;
     },
  //compare hub
  getHubStatus:async(parent,args,context)=>{
    filterfunction(new Date())
    args.input.filter==='today'?filter=todayFilter:''
    args.input.filter==='week'?filter=weekFilter:''
    args.input.filter==='month'?filter=monthFilter:''
    args.input.filter==='year'?filter=yearFilter:''
    if(context.role===process.env.ADMIN)
    { 
    const result= await Shipment.findAll({group: ['hubID', 'shipmentStatus'], attributes: ['hubID','shipmentStatus',[Sequelize.fn('COUNT', 'hubID'), 'count']],where:{...filter}})
    return result;
    }
    const hubID=context.hubID
    const result= await Shipment.findAll({group: ['shipmentStatus'], attributes: ['hubID','shipmentStatus',[Sequelize.fn('COUNT', 'shipmentStatus'), 'count']],where:{...filter,hubID:hubID}})
    return result;
   },
     //all
     getAllShipmentByDate:async(parent,args,context)=>{
      filterfunction(new Date())
      args.input.filter==='today'?filter=todayFilter:''
      args.input.filter==='week'?filter=weekFilter:''
      args.input.filter==='month'?filter=monthFilter:''
      args.input.filter==='year'?filter=yearFilter:''
      if(context.role===process.env.ADMIN)
      {
      const result= await Shipment.findAll({group: [Sequelize.fn('DAY',Sequelize.col('createdAt'))], attributes: ['createdAt',[Sequelize.fn('COUNT', 'createdAt'), 'count']],where: {
        ...filter
      }
    })
    return result;
  }
  const hubID=context.hubID
  const result= await Shipment.findAll({group: [Sequelize.fn('DAY',Sequelize.col('createdAt'))], attributes: ['createdAt',[Sequelize.fn('COUNT', 'createdAt'), 'count']],where: {
    ...filter,hubID
  }
})
  return result;
},
     getAllShipmentGroupByHub:async(parent,args)=>{
      const result= await Shipment.findAll({where:{shipmentStatus:{[Sequelize.Op.in]:[process.env.SHIPMENTDELIVERED,process.env.SHIPMENTOUTFORDELIVERY]}},group: ['driverAssigned', 'shipmentStatus'], attributes: ['_id','driverAssigned','shipmentStatus',[Sequelize.fn('COUNT', 'driverAssigned'), 'count']]})
      return result;
     },
     getFilteredShipment:async(parent,args,context)=>{
      const filter=[]
      args.input.delivered&&filter.push(process.env.SHIPMENTDELIVERED)
      args.input.canceled&&filter.push(process.env.SHIPMENTCANCELED)
      args.input.onprogress&&filter.push(process.env.SHIPMENTOUTFORDELIVERY)
      args.input.returned&&filter.push(process.env.SHIPMENTRETURNED)
      if(context.role===process.env.ADMIN)
        {      
        return await Shipment.findAll({where:{shipmentStatus:{[Sequelize.Op.in]:filter}},attributes: {exclude: ['count']}})
         }
         return await Shipment.findAll({where:{shipmentStatus:{[Sequelize.Op.in]:filter},hubID:context.hubID},attributes: {exclude: ['count']}})

     },
    getShipment:async(parent,args)=>{
      const user = await Shipment.findByPk(args._id,{attributes: {exclude: ['count']}})
      return user
     },
    getCustomer:async(parent,args)=>{
      const user = await Customer.findByPk(args._id)
      return user
    },
    getActiveDriver:async(parent,args,context)=>{
      if(context.role===process.env.ADMIN)
      { 
      const user = await User.findAll({where:{userType:process.env.DRIVER,isActive:true}})
      return user
      }
      const user = await User.findAll({where:{userType:process.env.DRIVER,isActive:true,hubID:context.hubID}})
      return user
    },
    getAllWarehouseID:async(parent,args,context)=>{
      if(context.role===process.env.ADMIN)
      {
        const warehouse = await Warehouse.findAll({attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('warehouseID')) ,'warehouseID'],'exactLocation','_id'
      ]})
        return warehouse
      }
      return await Warehouse.findAll({where:{_id:context.hubID},attributes: {exclude: ['count']}})

    },
    getPickupLocation:async(parent,args)=>{
      const location = await Warehouse.findAll({where:{warehouseID:args.warehouseID}, attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('exactLocation')) ,'exactLocation'],'warehouseID','_id'
    ]})
      return location
    },
    getAllPickupLocation:async(parent,args)=>{
      const location = await Warehouse.findAll({attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('exactLocation')) ,'exactLocation'],'warehouseID','_id'
    ]})
      return location
    },
    getCODShipment:async(parent,args)=>{
      const result= await Shipment.findAll({where:{driverAssigned:args.driverAssigned,shipmentStatus:process.env.SHIPMENTDELIVERED,isCODCollected:false,CODAmount:{ [Op.ne]:0}},attributes: {exclude: ['count']}})
      return result;
    },
    getTransaction:async(parent,args,context)=>{
      const hubID=context.hubID
      if(context.role===process.env.ADMIN)
      {
      const transact  = await Transaction.findAll({order: [['createdAt', 'DESC']]})
      return transact 
    }
    const transact = await Transaction.findAll({where:{hubID:hubID},order: [['createdAt', 'DESC']]})
    return transact 
  },

},
Shipment:{
  async customer(parent,args) {
    return await Customer.findOne({where:{customerID:parent.customerID}})
    },
    async driver(parent,args) {
      return await User.findByPk(parent.driverAssigned)
      },
  async warehouse(parent,args) {
    return await Warehouse.findOne({where:{_id:parent.hubID}})
    },
  },

Customer:{
  async shipment(parent,args) {
    return await Shipment.findAll({where:{customerID:parent.customerID},attributes: {exclude: ['count']}})
    },
  },
Transact:{
  async driver(parent,args) {
    return await User.findOne({where:{_id:parent.driverAssigned},attributes: {exclude: ['count']}})
    },
    async collector(parent,args) {
    return await User.findOne({where:{_id:parent.collectedBy},attributes: {exclude: ['count']}})
    },
    },

User:{
    async shipment(parent,args,context) {
      if(context.role===process.env.ADMIN)
      {
       const result= await Shipment.findOne({where:{driverAssigned:parent._id,shipmentStatus:process.env.SHIPMENTDELIVERED,isCODCollected:false},group: ['driverAssigned'],attributes: [
        '_id',
        'currency',
        'driverAssigned',
        [Sequelize.fn('sum', Sequelize.col('CODAmount')), 'count'],
      ]
      })
      return result
      }
      else{
        const hubID=context.hubID
        return await Shipment.findAll({where:{driverAssigned:parent._id,hubID:hubID,shipmentStatus:process.env.SHIPMENTDELIVERED},group: ['driverAssigned'],attributes: [
          '_id',
          'currency',
          'driverAssigned',
          [Sequelize.fn('sum', Sequelize.col('CODAmount')), 'count'],
        ]
        })      
      }
    },
  }

}
module.exports=resolvers
