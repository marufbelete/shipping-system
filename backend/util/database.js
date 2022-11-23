const Sequelize=require('sequelize');
   //global
// const sequelize = new Sequelize("tdyphbtmzu7ykf2k","afgjx55js08kivp0","m9xmghzdjf14e2ep",{
//         dialect:"mariadb",
//         host:"uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
// });
// module.exports=sequelize;

//local
const sequalize=new Sequelize("shops","saleh","test",{
    dialect:"mariadb",
    host:"mariadb"
});
module.exports=sequalize;


