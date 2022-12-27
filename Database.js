const mongoose = require("mongoose")

exports.connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/machineAdmin").
    then((con) => console.log("database connected ",con.connection.host))
    .catch((err) => console.error(err))
}