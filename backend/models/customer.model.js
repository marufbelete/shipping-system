
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Customer=sequalize.define('customer',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   fullName:{
  type:Sequalize.STRING,
  allowNull:false,
   },
   customerID:{
      type:Sequalize.STRING,
     },
   contactPerson:{
   type:Sequalize.STRING
         },
   contactPersonPhone:{
      type:Sequalize.STRING
            },
   phoneNumber:{
      type:Sequalize.STRING
      },
   locationAddress:{
      type:Sequalize.STRING,
      },
   hubID:{
      type:Sequalize.STRING,
      allowNull:false,
   }


 })

 module.exports = Customer;

 