const cloudinary = require("cloudinary")


const FeaturePhotos = require("../Models/FeaturePhotos")

exports.addFeaturePhotos = async (req, res) => {
    try {
        if (req.files) {
            let data = [];
            let featurePhotos = await FeaturePhotos.findOne({})

            for (var i = 0; i < req.files.length; i++) {

                const result = await cloudinary.uploader.upload(req.files[i].path);
                data.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            if (featurePhotos) {
                console.log(data)
                data.forEach(items => {
                    featurePhotos.photos.push(items)

                })
                await featurePhotos.save()
            }

            if (!featurePhotos) {
                featurePhotos = await FeaturePhotos.create({ photos: data })
            }

            return res.status(201).json({ sucess: true, featurePhotos, message: "feature photos added sucessfully" });
        }

        if (!req.files) {
            return res.status(403).json({
                success: false,
                message: "no image found"
            })
        }



    } catch (error) {
        console.error(error)
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}




exports.deleteFeaturePhotos = async (req, res) => {
    try {
        const { id } = req.body
        const featurePhotos = await FeaturePhotos.findById({ _id: id })
        if (featurePhotos.length == 0) {
            return res.status(403).json({
                success: false,
                message: "no feature photos found "
            })
        }

        featurePhotos.photos.forEach((item) => {
            cloudinary.uploader.destroy(item.public_id);
        });

        return res.status(200).json({
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
