const mongoose = require("mongoose")

exports.connectDatabase = () => {
    mongoose.connect("mongodb+srv://Navendu:n2HYtFF6ARyMD2xH@cluster0.dm6dbla.mongodb.net/msStorage").
    then((con) => console.log("database connected ",con.connection.host))
    .catch((err) => console.error(err))
}
