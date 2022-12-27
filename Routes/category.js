const express = require("express")
const { addCategory, addBrand, getCategoriesAndBrnad, deleteBrand, deleteCategory } = require("../Controller/category")
const { isAuth } = require("../isauth")

const router = express.Router()

router.route('/addCategory').post(isAuth,addCategory)

router.route('/addBrand').post(isAuth,addBrand)


router.route('/allcatNbrand').get(getCategoriesAndBrnad)

router.route('/deletebrand').post(isAuth,deleteBrand)

router.route('/deletecategory').post(isAuth,deleteCategory)


module.exports = router