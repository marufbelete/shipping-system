const express = require('express');
const userauth = require("../middleware/auth.middleware")
const { loginUser,updateUser,saveUser,deleteUser, sendEmail, resetPassword, getAllUsers,getAllDriver, changePassword, getMyInfo, updateStatus, checkAuth } = require('../controllers/user.controller');
const {addCsutomer,updateCustomer,deleteCustomer,getAllCstomers}=require('../controllers/customer.controller')
const {errorHandler} = require('../middleware/errohandling.middleware')
const router = express.Router();
//customer
router.get('/checkauth',checkAuth,errorHandler)
router.post('/addcustomer',userauth,  addCsutomer,errorHandler)
router.get('/getallcustomer',userauth,getAllCstomers,errorHandler)
router.put('/updatecustomer/:id',userauth,updateCustomer,errorHandler)
router.delete('/deletecustomer/:id',userauth,deleteCustomer,errorHandler)
//users
router.post('/register',userauth, saveUser,errorHandler)
router.get('/getmyinfo',userauth,getMyInfo,errorHandler)
router.get('/getalluser',userauth,getAllUsers,errorHandler)
router.get('/getalldriver',userauth,getAllDriver,errorHandler)
router.post('/login', loginUser,errorHandler)
router.put('/updateuser/:id',userauth,updateUser,errorHandler)
router.put('/updatestate/:id',userauth,updateStatus,errorHandler)
router.put('/changepassword',userauth,changePassword,errorHandler)
router.delete('/deleteuser/:id',userauth,deleteUser,errorHandler)

// needs to be changed
router.post('/emailsend',sendEmail,errorHandler)
router.post('/resetpassword/:token',resetPassword,errorHandler)

//disable user

//assign user to different hub



module.exports = router

