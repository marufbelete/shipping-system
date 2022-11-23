
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Pod=sequalize.define('pod',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   shipmentID: {
    type:Sequalize.STRING,
    allowNull:false,
},
    customerID: {
        type:Sequalize.STRING,
        allowNull:false,
    },
    description: {
        type:Sequalize.STRING,
    },
    imageUrl: {
        type:Sequalize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('imageUrl').split(';')
        },
        set(val) {
            this.setDataValue('imageUrl',val.join(';'));
        }

    },
    userId:{
        type:Sequalize.INTEGER,
        allowNull:false,
    }
      
   
 })
 module.exports = Pod;
