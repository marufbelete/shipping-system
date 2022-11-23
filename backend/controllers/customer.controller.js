const Customer = require("../models/customer.model");
const ShortUniqueId = require('short-unique-id');

//signup
exports.addCsutomer = async (req, res, next) => {
  try {
    const fullName= req.body.fullName
    const uid = new ShortUniqueId({ length: 12 });
    const contactPerson=req.body.contactPerson
    const contactPersonPhone=req.body.contactPersonPhone
    const phoneNumber =req.body.phoneNumber
    const locationAddress=req.body.locationAddress
    const hubID=req.user.role!=='1111'?req.user.hubID:req.body.warehouseID

    if (!fullName||!phoneNumber||!locationAddress) {
      const error = new Error("Please fill all field.")
      error.statusCode = 400
      throw error;
    }
    const customer=await Customer.create({
      fullName: fullName,
      customerID: uid(),
      hubID,
      phoneNumber: phoneNumber,
      contactPerson: contactPerson,
      contactPersonPhone: contactPersonPhone,
      locationAddress:locationAddress,
    }) 
    return res.json(customer)
  }
  catch(error) {
    next(error)
  }
};

exports.getAllCstomers = async (req, res, next) => {
  try {
    const users=await Customer.findAll({attributes: { exclude: ['createdAt','updatedAt'] }})
    return res.json(users)
  }
  catch(err)
  {
    next(err)

  }
}

exports.updateCustomer = async (req, res, next) => {
  try {
    const id=req.params.id
    const {fullName,contactPerson,hubID,contactPersonPhone,phoneNumber,locationAddress}=req.body
   await Customer.update({
    fullName,
    contactPerson,
    contactPersonPhone,
    phoneNumber,
    hubID,
    locationAddress,
   },
    { where: { _id: id } })
   res.json("user Info updates successfully")
  }
  catch(error) {
    next(error)
  }
};

exports.deleteCustomer=async(req,res,next)=>{
  try{
    const id=req.params.id
    const deletedid=await Customer.destroy({ where: { _id: id } });
    return res.json(deletedid)
  }
  catch(err){
    next(err)
  }
}