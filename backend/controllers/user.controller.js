const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const {Op}=require('sequelize');

//signup
exports.checkAuth = (req, res, next) => {
  try{
  const token =req.cookies.access_token;
  if (token) {
    jwt.verify(token,process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({message:"no token",status:false });
      }
      return res.json({message:"ok"});
    });
  }
  else {
    return res.status(403).json({message:"no token"});
  }
}
catch(error)
  {
    next(error)
  }
};
exports.saveUser = async (req, res, next) => {
  try {
    const username= req.body.username
    const mobile= req.body.mobile
    const password=req.body.password
    const confirmPassword=req.body.confirmPassword
    const hub =req.user.role!=='1111'?req.user.hubID:req.body.hub
    const fullName=req.body.fullName
    const userType =req.body.userType
    const shift=req.body.shift
    const priority=req.body.priority
    if (!username || !password || !confirmPassword) {
      const error = new Error("Please fill all field.")
      error.statusCode = 400
      throw error;
    }
   
      const anyusername = await User.findOne({ where: { username: username} })
    if (anyusername) {
      const error = new Error("user-name is already in use")
      error.statusCode = 400
      throw error;
    }
    if (password!==confirmPassword) {
      const error = new Error("password must match")
      error.statusCode = 400
      throw error;
    }
    if (password.length < 5) {
      const error = new Error("the password need to be atleast 5 charcter long.")
      error.statusCode = 400
      throw error;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user=await User.create({
      username: username,
      password: passwordHash,
      mobile: mobile,
      hubID: hub,
      fullName:fullName,
      userType: userType,
      shift:shift,
      priority:priority
    }) 
    return res.json({message:"user added"})
  }
  catch(error) {
    next(error)
  }
};

//log in
exports.loginUser = async (req, res, next) => {
  try {
    const username=req.body.username;
    const password = req.body.password
    if (!username || !password) {
      const error = new Error("Please fill all field.")
      error.statusCode = 400
      throw error;
    }
    const user = await User.findOne({
      where:{ username: username,userType:{[Op.ne]:process.env.DRIVER}}
    });
    if (!user) {
      const error = new Error("No account with this user-name exist")
      error.statusCode = 400
      throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const error = new Error("Invalid credential.")
      error.statusCode = 400
      throw error;
    }
  
    const token = jwt.sign({ sub: user._id, name: user.fullName,role:user.userType,hubID:user.hubID }, process.env.SECRET);
    return res.status(202).cookie("access_token", token, {
      path:'/',
       }).json({
      auth:true,
      user:user.fullName,
      role:user.userType,
      token
    });
  }
  catch(error) {
    next(error)
  }
};
//get my info
exports.getMyInfo = async (req, res, next) => {
  try {
    const id=req.user.sub
    const users=await User.findByPk(id)
    return res.json(users)
  }
  catch(err)
  {
    next(err)

  }
}
//get all user
exports.getAllUsers = async (req, res, next) => {
  try {
        if(req.user.role===process.env.ADMIN)
    {
      const users=await User.findAll({attributes: { exclude: ['createdAt','updatedAt','password'] }})
      return res.json(users)
    }
    else{
      const hubID=req.user.hubID
      const users=await User.findAll({where:{userType:process.env.DRIVER,hubID:hubID},attributes: { exclude: ['createdAt','updatedAt','password'] }})
      return res.json(users)
    }
    
  }
  catch(err)
  {
    next(err)

  }
}
exports.getAllDriver=async(req,res,next)=>
{
  if(req.user.role===process.env.ADMIN)
  {
  const drivers=await User.findAll({where:{userType:process.env.DRIVER},attributes: { exclude: ['createdAt','updatedAt','password'] }})
  return res.json(drivers)
  }
  const hubID=req.user.hubID
  const drivers=await User.findAll({where:{userType:process.env.DRIVER,hubID:hubID},attributes: { exclude: ['createdAt','updatedAt','password'] }})
  return res.json(drivers)
}

//update user info
exports.updateUser = async (req, res, next) => {
  try {
    let updateinfo={}
    const {fullName,mobile,hubID,userType,shift,priority}=req.body
    const id=req.params.id;
    updateinfo.fullName=fullName
    updateinfo.mobile=mobile
    updateinfo.hubID=hubID
    updateinfo.userType=userType
if(shift)
{
  updateinfo.shift=shift
}
if(priority)
{
  updateinfo.priority=priority
}
   await User.update(
    updateinfo,
    { where: { _id: id } })
   res.json("user Info updated successfully")
  }
  catch(error) {
    next(error)
  }
};
//change status
exports.updateStatus = async (req, res, next) => {
  try {
    const {status}=req.body
    const id=req.params.id;
   await User.update(
    {isActive:status},
    { where: { _id: id } })
  return res.json({success:true})
  }
  catch(error) {
    next(error)
  }
};
//change password
exports.changePassword = async (req, res, next) => {
  try {
    const password=req.body.newPassword
    const oldPasswrod=req.body.oldPassword
    let passwordHash
    const id=req.user.sub;
    const user = await User.findOne({
      where:{ _id: id}
    });
    const isMatch = await bcrypt.compare(oldPasswrod, user.password)
    if (!isMatch) {
      const error = new Error("Incorrect old password.")
      error.statusCode = 400
      throw error;
    }
  if(password)
{
    if (password.length < 5) {
      const error = new Error("the password need to be atleast 5 charcter long.")
      error.statusCode = 400
      throw error;
    }
    const salt = await bcrypt.genSalt();
    passwordHash = await bcrypt.hash(password, salt);
  } 

   await User.update(
    {password:passwordHash},
    { where: { _id: id } })
    return res.json({success:true})
  }
  catch(err){
    next(err)
  }
}
//update my info
exports.updateMyInfo = async (req, res, next) => {
  try {
    const password=req.body.password
    const confirmpassword=req.body.confirmpassword
    const fullName=req.body.fullName
    const id=req.params.id;
    let passwordHash
    let updateinfo={}
if (password!==confirmpassword) {
      const error = new Error("password must match")
      error.statusCode = 400
      throw error;
    }
if(fullName)
{
  updateinfo.fullName=fullName
}
if(password)
{
    if (password.length < 5) {
      const error = new Error("the password need to be atleast 5 charcter long.")
      error.statusCode = 400
      throw error;
    }
    const salt = await bcrypt.genSalt();
    passwordHash = await bcrypt.hash(password, salt);
    updateinfo.password=passwordHash
  } 

   await User.update(
    updateinfo,
    { where: { _id: id } })
   return res.json("user Info updated successfully")
  }
  catch(error) {
    next(error)
  }
};

exports.sendEmail = async (req, res, next) => {
  try {
    const email=req.body.email
    const token = jwt.sign({ Email:email},process.env.SECRET,{expiresIn:'20m'});
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token:process.env.REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken
      }
    });
    const mailOptions = {
      from:process.env.EMAIL,
      to: email,
      subject: 'Password Reseting Link',
      text: 'Follow the link to reset your password you will have ten minute before the link expired!',
      html:`http://137.184.143.106:3000/resetpassword/${token}`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
       return res.json("please try again")
      } else {
        return
      }
    });
  }
  catch(err){
next(err)
  }
}

exports.resetPassword=async(req,res,next)=>{
  try{
  const token= req.params.token
  const password=req.body.password
  jwt.verify(token, process.env.SECRET, async(err, user) => {
  if (err) {
    if(err.name == "TokenExpiredError")
    {
      return res.status(403).send({ msg: "your link expired please try again" });
      
    }
  }
  else{
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    await User.update(
      {password:passwordHash},
      { where: { username: user.Email} })
      return res.json({reset:true})
  }
})
 }
catch(err){
  next(err)
    }

}

exports.deleteUser=async(req,res,next)=>{
  try{
    const userid=req.params.id
    const id=await User.destroy({ where: { _id: userid } });
    return res.json(id)
  }
  catch(err){
    next(err)
  }
}