const express = require("express")
const { addFeaturePhotos, deleteFeaturePhotos,getAllFeaturePhotos } = require("../Controller/featurePhotos")
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

router.route('/uploadfeaturephotos').post(isAuth,upload.array("photos",10),addFeaturePhotos)
router.route('/deletefeaturephotos').post(isAuth,deleteFeaturePhotos)
router.route('/allFeaturePhotos').get(getAllFeaturePhotos)


module.exports = router
