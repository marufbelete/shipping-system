const express = require('express');
const userauth = require("../middleware/auth.middleware")
const {getShipmentByStatus} = require('../controllers/shipment.controller');
const {errorHandler} = require('../middleware/errohandling.middleware')
const router = express.Router();
//customer
router.get('/getshipmentbyreportstatus',userauth,getShipmentByStatus,errorHandler)
// router.put('/updatecustomer/:id',userauth,updateCustomer,errorHandler)
// router.delete('/deletecustomer/:id',userauth,deleteCustomer,errorHandler)