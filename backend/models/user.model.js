
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const User=sequalize.define('user',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   username:{
  type:Sequalize.STRING,
  allowNull:false,
  unique:true
   },
   fullName:{
  type:Sequalize.STRING,
   },
   password:{
    type:Sequalize.STRING,
    allowNull:false,
       },
    hubID:{
      type:Sequalize.INTEGER,
      references: {
         model: 'warehouses',
         key: '_id', 
      }
   },
    userType:{
     type:Sequalize.STRING
          },
   shift:{
   type:Sequalize.STRING
     },
   priority:{
      type:Sequalize.STRING
     },
   isActive:{
      type:Sequalize.BOOLEAN,
      defaultValue:true,
     },
   mobile:{
      type:Sequalize.STRING
   },
   CODBalance:{
      type:Sequalize.INTEGER,
      defaultValue:null
   }
 })

 module.exports = User;

 