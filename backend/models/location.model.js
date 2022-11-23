
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Location=sequalize.define('location',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   country:{
    type:Sequalize.STRING,
    allowNull:false,
     },
   city:{
  type:Sequalize.STRING,
  allowNull:false,
   },
   specialName:{
    type:Sequalize.STRING,
    allowNull:false,
     }
 })
 module.exports = Location;
