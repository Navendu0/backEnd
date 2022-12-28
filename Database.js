const mongoose = require("mongoose")

exports.connectDatabase = () => {
    mongoose.connect("mongodb+srv://pritam:tTcc2jdrRSveXo2J@cluster0.ivwjaoi.mongodb.net/MachineDatabase").
    then((con) => console.log("database connected ",con.connection.host))
    .catch((err) => console.error(err))
}
