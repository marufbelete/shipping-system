const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Shipment=sequalize.define('shipment',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   shipmentID:{
  type:Sequalize.STRING,
  allowNull:false
   },
   pickupDate:{
  type:Sequalize.DATE,
  allowNull:false
   },
   hubID:{
    type:Sequalize.INTEGER,
    references: {
       model: 'warehouses',
       key: '_id', 
    }
     },
     //
     shipmentSequence:{
      type:Sequalize.INTEGER,
      defaultValue:null
    },
   customerID:{
    type: Sequalize.STRING,
    allowNull:false
   },
   orgDeliveryDate:{
    type:Sequalize.DATE,
    allowNull:false
   },
   actualReceivedDate:{
    type:Sequalize.DATE
   },
   deliveryETA:{
    type:Sequalize.DATE,
    defaultValue:null
   },
   shipmentStatus:{
     type:Sequalize.STRING,
     allowNull:false,
     defaultValue:'1111'
   },
  shipmentSubStatus:{
    type:Sequalize.STRING,
  },
  CODAmount:{
    type:Sequalize.INTEGER,
    defaultValue:0
  },
  currency:{
    type:Sequalize.STRING,
  },
   count:{
    type:Sequalize.INTEGER,
    defaultValue:null
  },
  image:{
    type:Sequalize.STRING
  },
  isCODCollected:{
    type:Sequalize.BOOLEAN,
    defaultValue:false
  },
  AWB:{
    type:Sequalize.STRING,
    allowNull:false,
  },
  locationAddress:{
    type:Sequalize.STRING,
    defaultValue:null

},
latituide:{
 type:Sequalize.STRING,
 defaultValue:null
},
longitude:{
 type:Sequalize.STRING,
 defaultValue:null

},
driverAssigned:{
  type:Sequalize.INTEGER,
  references: {
      model: 'users',
      key: '_id', 
  }
}
 })
 module.exports = Shipment;
