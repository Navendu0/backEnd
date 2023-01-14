const express = require("express")
const { addCategory, addBrand, getCategoriesAndBrnad, deleteBrand, deleteCategory, addCategoryImage } = require("../Controller/category")
const { isAuth } = require("../isauth")


var multer = require('multer');

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

router.route('/addimage').post(upload.single('categoryImage'),addCategoryImage)

router.route('/addCategory').post(isAuth,upload.single('categoryImage'),addCategory)

router.route('/addBrand').post(isAuth,addBrand)


router.route('/allcatNbrand').get(getCategoriesAndBrnad)

router.route('/deletebrand').post(isAuth,deleteBrand)

router.route('/deletecategory').post(isAuth,deleteCategory)


module.exports = router