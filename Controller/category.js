const Category = require("../Models/Category")
const Brand = require('../Models/Brand')
const { findById } = require("../Models/Brand")

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body
        let category = await Category.findOne({ name })

        if (category) {
            return res.status(203).json({
                success: false,
                message: "alredy exists try new one"
            })
        }

        category = await Category.create({ name });

        res.status(201).json({ sucess: true, category, message: "category added sucessfully" });


    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}


exports.addBrand = async (req, res) => {
    try {
        const { name } = req.body

        let brand = await Brand.findOne({ name })


        if (brand) {
            return res.status(203).json({
                success: false,
                message: "alredy exists try new one"
            })
        }

        const name2 = name.toLowerCase()

        brand = await Brand.create({ name: name2 });

        res.status(201).json({ sucess: true, brand, message: "New Brand added sucessfully" });


    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}



exports.getCategoriesAndBrnad = async (req, res) => {
    try {
        const categories = await Category.find({})
        let brand = await Brand.find({})


        res.status(201).json({ sucess: true, brand, categories });


    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}


exports.deleteBrand = async (req, res) => {
    try {

        const { id } = req.body

        let brand = await Brand.findById({_id:id})

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand Not Found delete opration failed"
            })
        }

        if(brand?.quantity!=0){
            return res.status(403).json({
                success: false,
                message: "You can not delete this brand"
            })
        }
      
        brand =  await Brand.deleteOne(brand)

        return res.status(200).json({
            brand,
            success: true,
            message: "delete successfuly"
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.deleteCategory=async(req,res)=>{
    try {

        const { id } = req.body
    
        let category = await Category.findById({_id:id})
    
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "category Not Found delete opration failed"
            })
        }
    
        if(category?.quantity!=0){
            return res.status(403).json({
                success: false,
                message: "You can not delete this brand"
            })
        }

        category = await Category.deleteOne(category)
    
        return res.status(200).json({
            category,
            success: true,
            message: "delete successfuly"
        })
    
    
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    
    
}




