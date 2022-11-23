
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Warehouse=sequalize.define('warehouse',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   warehouseID:{
  type:Sequalize.STRING,
  allowNull:false,
  unique: true
   },
  country:{
  type:Sequalize.STRING,
  allowNull:false,
    },
  city:{
  type:Sequalize.STRING,
  allowNull:false,
    },
  exactLocation:{
  type:Sequalize.STRING,
  allowNull:false,
  },
  cutofTimeType:{
  type:Sequalize.STRING,
  allowNull:false,
    },
  cutoffTime:{
  type:Sequalize.DATE,
  allowNull:false,
    },
  status:{
  type:Sequalize.BOOLEAN,
  defaultValue:true,
    },
  conatactPerson:{
  type:Sequalize.STRING,
  allowNull:false,
    },
  contactPhone:{
  type:Sequalize.STRING,
  allowNull:false,
    },
  alternativeContact:{
  type:Sequalize.STRING,
  allowNull:false,
    },
 })
 module.exports = Warehouse;
