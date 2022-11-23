const express = require('express');
const userauth = require("../middleware/auth.middleware")
const { createPost,getAllPost,getMyPost,deletePost,updatePost } = require('../controllers/post.controller')
const { createPod,getMyPod } = require('../controllers/pod.controller')
const {createCatagory,getCatgory,updateCatagory,deleteCatagory} = require('../controllers/catagory.controller')
const {createLocation,getCity,updateCity,deleteCity} = require('../controllers/location.controller')
const {createHub,getHub,updateHub,deleteHub} = require('../controllers/hub.controller')
const {createShipment,getShipment,updateShipment, createShipments} = require('../controllers/shipment.controller')
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
router.post('/addcity', userauth,createLocation,errorHandler)
router.get('/getcity', userauth,getCity,errorHandler)
router.put('/updatecity/:id', userauth,updateCity,errorHandler)
router.delete('/deletecity/:id', userauth,deleteCity,errorHandler)
//hub
router.post('/addhub',createHub,errorHandler)
router.get('/gethub', userauth,getHub,errorHandler)
router.put('/updatehub/:id', userauth,updateHub,errorHandler)
router.delete('/deletehub/:id', userauth,deleteHub,errorHandler)

//shipment
router.post('/createshipment', userauth,createShipment,errorHandler)
router.post('/createshipments', userauth,createShipments,errorHandler)
router.get('/getshipment', userauth,getShipment,errorHandler)
router.put('/updateshipment/:shipmenid', userauth,updateShipment,errorHandler)


// get list of shipments
router.get('/getshipmentlist', userauth,getShipment,errorHandler)
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
