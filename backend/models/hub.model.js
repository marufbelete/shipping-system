
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Hub=sequalize.define('hub',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   hubName:{
  type:Sequalize.STRING,
  allowNull:false,
  unique: true
   },
   hubID:{
    type:Sequalize.STRING,
    allowNull:false,
    unique: true
     },
   hubAddress:{
    type:Sequalize.STRING,
    allowNull:false,
    unique: true
     }
 })
 module.exports = Hub;
