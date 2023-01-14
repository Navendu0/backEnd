const Category = require("../Models/Category")
const Brand = require('../Models/Brand')
const cloudinary = require("cloudinary")

exports.addCategoryImage = async (req, res) => {
    try {

        if (req.file) {
            console.log(req.file)
            res.status(201).json({ sucess: true, message: "category added sucessfully" });
        }

        // res.status(201).json({ sucess: true, category, message: "category added sucessfully" });


    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}


exports.addCategory = async (req, res) => {
    try {
        const { name } = JSON.parse(req.body.json)

        if (name == undefined) {
            return res.json({ sucess: false, message: "category name is undefined" });
        }

        let category = await Category.findOne({ name })

        if (category) {
            return res.status(203).json({
                success: false,
                message: "alredy exists try new one"
            })
        }


        if (!req.file) {

            return res.status(303).json({ sucess: false, message: "please select a image" });
        }



        const result = await cloudinary.uploader.upload(req.file.path);
        const image = {
            public_id: result.public_id,
            url: result.secure_url,
        }


        category = await Category.create({ name, image });

        res.status(201).json({ sucess: true, category, message: "category added sucessfully" });


    } catch (error) {
        console.log(error)
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

        let brand = await Brand.findById({ _id: id })

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: "Brand Not Found delete opration failed"
            })
        }

        if (brand?.quantity != 0) {
            return res.status(403).json({
                success: false,
                message: "You can not delete this brand"
            })
        }

        brand = await Brand.deleteOne(brand)

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

exports.deleteCategory = async (req, res) => {
    try {

        const { id } = req.body

        let category = await Category.findById({ _id: id })

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "category Not Found delete opration failed"
            })
        }

        if (category?.quantity != 0) {
            return res.status(403).json({
                success: false,
                message: "You can not delete this brand"
            })
        }


        await cloudinary.uploader.destroy(category.image.public_id);


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




