const Brand = require("../Models/Brand")
const Category = require("../Models/Category")
const Product = require("../Models/Product")
const cloudinary = require("cloudinary")


// const express = require("express")
var fs = require('fs');
var path = require('path');


exports.uploadImage = async (req, res) => {
    try {
        if (req.files) {
            let data = [];
            for (var i = 0; i < req.files.length; i++) {
                const result = await cloudinary.uploader.upload(req.files[i].path);
                data.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
            res.send(data);
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({
            sucess: false,
            message: error.message,
        });
    }
};


exports.addNewProduct = async (req, res) => {
    try {
        const { name, price, images, highlightText, description, youtubeLinks, category, brandName
        } = req.body

        const categoryFind = await Category.findOne({ name: category })

        const brandFind = await Brand.findOne({ name: brandName })
        console.log(brandFind)

        if (!categoryFind && !brandFind) {
            return res.status(203).json({
                success: false,
                message: "can`t find category or Brand "
            })
        }

        let newProduct = await Product.create({
            name, price, highlightText, description, youtubeLinks, category, brandName, images
        })

        categoryFind.quantity = categoryFind.quantity + 1
        brandFind.quantity = brandFind.quantity + 1


        await categoryFind.save()
        await brandFind.save()


        res.status(200).json({
            newProduct,
            success: true,
            message: "new product add successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}

exports.allProduct = async (req, res) => {
    try {
        const products = await Product.find({})

        res.status(200).json({
            user: req?.user,
            success: true,
            message: "successful",
            products,

        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




exports.deleteProduct = async (req, res) => {

    try {
        const { id } = req.body
        let product = await Product.findById({ _id: id })

        const categoryFind = await Category.findOne({ name: product.category })

        const brandFind = await Brand.findOne({ name: product.brandName })

        if (!product) {
            return res.status(201).json({
                success: false,
                message: "product not found"
            })
        }


        product.images.forEach((item) => {
            cloudinary.uploader.destroy(item.public_id);
        });

        product = await Product.deleteOne(product)

        categoryFind.quantity = categoryFind.quantity - 1
        brandFind.quantity = brandFind.quantity - 1


        await categoryFind.save()
        await brandFind.save()


        if (product) {
            return res.status(200).json({
                product,
                success: true,
                message: "product deleted succes fully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


exports.productByCategory = async (req, res) => {
    try {
        const { category } = req.body
        const products = await Product.find({ category:category })


        res.status(200).json({
            success: true,
            message: "successful",
            products,

        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.productByBrand = async (req, res) => {
    try {
        const { brandName } = req.body
        const products = await Product.find({ brandName })

        res.status(200).json({
            user: req?.user,
            success: true,
            message: "successful",
            products,

        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.editProduct = async (req, res) => {
    try {
        const { id, name, price, images, highlightText, description, youtubeLinks, category, brandName } = req.body

        let product = await Product.findById({ _id: id })


        if (!product) {
            return res.status(200).json({
                success: false,
                message: "product not found"
            })
        }


        product = await Product.updateOne({ _id: id }, { name, price, images, highlightText, description, youtubeLinks, category, brandName }).then((result) => {
            res.status(200).json({
                success: false,
                message: "product update success"
            })
        }).catch(err => {
            res.status(203).json({
                success: false,
                message: "error while updating product"
            })
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
