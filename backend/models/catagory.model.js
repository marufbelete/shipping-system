
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Catagory=sequalize.define('catagory',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   catagory:{
  type:Sequalize.STRING,
  allowNull:false,
  unique: true
   },
 })


module.exports = Catagory ;



