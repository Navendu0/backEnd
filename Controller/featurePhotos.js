const cloudinary = require("cloudinary")

const FeaturePhotos = require("../Models/FeaturePhotos")

exports.addFeaturePhotos = async (req, res) => {
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
            const featurePhotos = await FeaturePhotos.create(data)
            res.status(201).json({ sucess: true, featurePhotos, message: "feature photos added sucessfully" });
        }



    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}




exports.deleteFeaturePhotos = async (req, res) => {
    try {
        const { id } = req.body
        const featurePhotos = await FeaturePhotos.findById({_id:id})
        if(featurePhotos.length == 0){
            return res.status(403).json({
                success:false,
                message:"no feature photos found "
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











