const express = require("express");
// const sequalize = require("./util/database");
const sequelize = require("./util/database");
const app = express();
const jwt = require("jsonwebtoken");
const userroute = require('./routes/user.route');
const postroute = require('./routes/post.route');
const bcrypt = require("bcryptjs")
const cron=require('node-cron')
const {ApolloServer}=require('apollo-server-express')
const resolvers =require('./gqlShema/resolver')
const typeDefs =require('./gqlShema/typedefs')
const Warehouse=require('./models/warehouse.model')
const Shipment=require('./models/shipment.model')
const User=require('./models/user.model')

// const scheduledFunctions = require('./controllers/shipment.controller');
require('dotenv').config()
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cors({
    origin: ['https://lobster-app-zzfzl.ondigitalocean.app','http://137.184.143.106:3000','https://localhost/','http://localhost/','https://localhost:3000','http://localhost:8000','https://studio.apollographql.com','http://localhost:3002', 'http://localhost:3000']
    ,credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userroute)
app.use(postroute)
// to show images
app.use(express.static('public')); 
app.use('/images', express.static('images'));
// automatic schedule at given cutoff time very day
const getAllcuttOff= async()=>{
  console.log("called asfsdgfadgs adfgadfga adfgadf ryqertad")
  const cut = await Warehouse.findAll({attribute:{include:['cutoffTime']}})
  cut.map(w=>{
  const date=new Date(w.cutoffTime)
  const tfdate=date.toLocaleString('en-US', {hour12: false,}).split(',')[1].split(":")
    cron.schedule(`${tfdate[2]} ${tfdate[1]} ${tfdate[0]} * * * * *`, async function(cutTime) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const inDriver=await User.findAll({where:{userType:process.env.DRIVER,hubID:w._id,isActive:true},attribute:{include:['_id']},transaction });
      let includeDriver=[...inDriver]
      const shipments=await Shipment.findAll({where:{driverAssigned:null,hubID:w._id},attribute:{include:['_id']},transaction});
      console.log(shipments)
      const promises = shipments.map(shipment=>{
        if(includeDriver.length===0)
        {
          includeDriver=[...inDriver]
        }
        const ass_driver=includeDriver.splice(Math.floor(Math.random()*includeDriver.length), 1)
        console.log(ass_driver[0]._id)
        return Shipment.update({driverAssigned:ass_driver[0]._id}, { where: { _id: shipment._id,hubID:w._id},transaction});
      }) 
      await Promise.all(promises);
      await transaction.commit();
      return
        }
        catch(error) {
         return
          }
    });
    return {hour:date.getUTCHours(),minute:date.getUTCMinutes(),second:date.getUTCSeconds(),hubID:w._id,}
  })

}
const SuperAdminCreate=async()=>{
  const username="alsehibanis@gmail.com"
  const password="12345"
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const anyusername = await User.findOne({ where: { username: username} })
if(!anyusername)
{
    await User.create({
    username: username,
    password: passwordHash,
    fullName:"Saleh",
    userType:process.env.ADMIN,
  }) 
}
return
}

const StartServer=async()=>{
  const apolloServer=new ApolloServer({
  typeDefs, 
  resolvers,
  csrfPrevention: true,
  context:async({ req, res }) => {
    const token = req.cookies.access_token;
    // const tokens = req.headers.cookie
    let users
    if (!token) {
      return {value:"no token"}
    }
    try {
      //  const token=tokens.split('=')[1];
      jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          return {value:"token error"}
        }
        users=user
        return;
      });
    } 
    catch {
      return {value:"unkown error"};
    }
    return users
  },
})
await apolloServer.start()
apolloServer.applyMiddleware({app:app,cors: false })
sequelize.sync().then(result=>{
  app.listen(process.env.PORT || 8000)
  SuperAdminCreate()
  getAllcuttOff()
  console.log("connected both")
}).catch(error=>{
  console.log(error)
})
}
StartServer()
module.exports.cutoffTimeCall=getAllcuttOff




