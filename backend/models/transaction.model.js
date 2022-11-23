const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Codtransaction=sequalize.define('transaction',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   hubID:{
    type:Sequalize.STRING,
    allowNull:false
     },
   collectedBy:{
    type:Sequalize.INTEGER,
    references: {
      model: 'users',
      key: '_id', 
  }
   },
  CODAmount:{
    type:Sequalize.INTEGER,
  },
  currency:{
    type:Sequalize.STRING,
  },
   count:{
    type:Sequalize.INTEGER,
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
 module.exports = Codtransaction;
