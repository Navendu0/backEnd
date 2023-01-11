const express = require("express")
const { addNewProduct, uploadImage, allProduct, deleteProduct, productByCategory, productByBrand, editProduct } = require("../Controller/product")
var app = express()

var fs = require('fs');
var path = require('path');
var multer = require('multer');
const { isAuth } = require("../isauth");

var storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads')
    // },
    filename: (req, file, cb) => {
      
        cb(null, Date.now()+'-'+file.originalname )
    }
});
  
var upload = multer({ storage: storage });


const router = express.Router()

router.route('/imageupload').post(isAuth,upload.array("image",10),uploadImage)
router.route('/addProduct').post(isAuth,addNewProduct)
router.route('/allproduct').get(allProduct)

router.route('/productByCategory').post(productByCategory)
router.route('/productByBrand').post(productByBrand)


router.route('/deleteproduct').post(isAuth,deleteProduct)
router.route('/updateproduct').post(isAuth,editProduct)



module.exports = router
