const express = require('express');
const userauth = require("../middleware/auth.middleware")
const { createPost,getAllPost,getMyPost,deletePost,updatePost } = require('../controllers/post.controller')
const { createPod,getMyPod } = require('../controllers/pod.controller')
const {createCatagory,getCatgory,updateCatagory,deleteCatagory} = require('../controllers/catagory.controller')
const {createLocation,getLocation, updateLocation, deleteLocation, createLocations} = require('../controllers/location.controller')
const {createHub,updateHub,deleteHub} = require('../controllers/hub.controller')
const {getHub,getWarehouse, updateWarehouse, updateWarehouseStatus, createWarehouse, adjustCutoffTime} = require('../controllers/warehouse.controller')
const {createShipment,getShipment,updateShipment, createShipments, updateProofDoc, assignDriver,assignMultipleDriver, getShipmentByStatus, updateAssignShipment, analysisAndAssign, collectCOD} = require('../controllers/shipment.controller')
const { getOtp} = require('../controllers/otp.controller')
const {errorHandler} = require('../middleware/errohandling.middleware')
const multer=require("multer");
const router = express.Router();
const fileStorage = multer.memoryStorage()

const cookieParser = require("cookie-parser")
router.use(cookieParser());

const cors = require('cors');
router.use(cors({
    origin: ['https://localhost/','http://localhost/','https://localhost:3000/','http://localhost:3000/', 'http://localhost:3000']
    ,credentials: true
}));

// file compression
const filefilter = (req, file, cb) => {
    console.log("filter")
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true)
  }
  else {
    const type=file.mimetype.split("/")[1]
    req.mimetypeError=`${type} file is not allowed please attach only image file`;
    cb(null, false,new Error(`${type} file is not allowed please attach only image file`))
    
  } 
}
const upload=multer({ storage: fileStorage, fileFilter: filefilter })

//post
router.post('/createpost', userauth,upload.array('image',6),createPost,errorHandler)
router.get('/getallpost', userauth,getAllPost,errorHandler)
router.get('/getmypost', userauth,getMyPost,errorHandler)
router.put('/updatepost/:id',upload.array('image',6), userauth,updatePost,errorHandler)
router.delete('/deletepost/:id', userauth,deletePost,errorHandler)

//catagory
router.post('/createcatagory', userauth,upload.single('image'),createCatagory,errorHandler)
router.get('/getcatagory', userauth,getCatgory,errorHandler)
router.put('/updatecatagory/:id',upload.single('image'), userauth,updateCatagory,errorHandler)
router.delete('/deletecatagory/:id', userauth,deleteCatagory,errorHandler)

//location
router.post('/addlocation', userauth,createLocation,errorHandler)
router.post('/addlocations', userauth,createLocations,errorHandler)
router.get('/getlocation', userauth,getLocation,errorHandler)
router.put('/updatelocation/:id', userauth,updateLocation,errorHandler)
router.delete('/deletelocation/:id', userauth,deleteLocation,errorHandler)
//hub
router.post('/addhub',createHub,errorHandler)
router.get('/gethub', userauth,getHub,errorHandler)
router.put('/updatehub/:id', userauth,updateHub,errorHandler)
router.delete('/deletehub/:id', userauth,deleteHub,errorHandler)
//warehouse
router.post('/createwarehouse', userauth,createWarehouse,errorHandler)
router.get('/getwarehouse', userauth,getWarehouse,errorHandler)
router.get('/gethub', userauth,getHub,errorHandler)
router.put('/updatewarehousestate/:id',userauth,updateWarehouseStatus,errorHandler)
router.put('/updatehub/:id', userauth,updateHub,errorHandler)
router.put('/adjustcutofftime', userauth,adjustCutoffTime,errorHandler)
router.put('/updatewarehouse/:id', userauth,updateWarehouse,errorHandler)
router.delete('/deletehub/:id', userauth,deleteHub,errorHandler)
//shipment
router.post('/createshipment',upload.single('image'), userauth,createShipment,errorHandler)
router.post('/createshipments', userauth,createShipments,errorHandler)
router.get('/getshipment', userauth,getShipment,errorHandler)
router.get('/getshipmentbystatus', userauth,getShipmentByStatus,errorHandler)
router.put('/updateshipment/:id', userauth,updateShipment,errorHandler)
router.put('/updateassignshipment/:id', userauth,updateAssignShipment,errorHandler)
router.put('/assigndriver/:id', userauth,assignDriver,errorHandler)
router.put('/assignmultipledriver', userauth,assignMultipleDriver,errorHandler)
router.put('/updateproofdoc/:id',upload.single('image'),userauth,updateProofDoc,errorHandler)
router.put('/analysisandassign',userauth,analysisAndAssign,errorHandler)
router.put('/collectcod', userauth,collectCOD,errorHandler)

// get list of shipments to be retured to hub
router.get('/getshipmenttohub', userauth,getShipment,errorHandler)

//otp
router.post('/getotp', userauth,getOtp,errorHandler)

//needs changing
router.post('/generateotp', userauth,getOtp,errorHandler)
router.post('/verifyotp', userauth,getOtp,errorHandler)

//pod
router.post('/createpod', userauth,upload.array('image',6),createPod,errorHandler)
router.get('/getmypod', userauth,getMyPod,errorHandler)

//assignment apis


//communication apis

module.exports = router

