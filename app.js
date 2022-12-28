const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./Models/User");
const userRoute = require('./Routes/user')
const categoryRoute = require('./Routes/category')
const productRoute = require('./Routes/product')

//----------------------------------------- END OF IMPORTS----------------------------------------

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/uploads', express.static('uploads'));

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

// require("./passportConfig")(passport);
require("./PassportConfig")(passport)


//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.use('/api/v1',userRoute)

app.use('/api/v1',categoryRoute)
app.use('/api/v1',productRoute)



app.get('/',(req,res)=>{
  res.send("ok navendu")
})


module.exports = app;


// // mongodb connection
// const connectDatabase = () => {
//     mongoose.connect("mongodb://localhost:27017/machineData").
//     then((con) => console.log("database connected ",con.connection.host))
//     .catch((err) => console.error(err))
// }

// connectDatabase()



// app.post('/upload',upload.single('image'),async function(req,res,next){
//     try {
//         if(req.file){
//             console.log(req.file)
//             return res.send(req.file)
//         }
//     } catch (error) {
//         console.error(error)
//         return res.send(error)
//     }
// })


//let storage = multer.diskStorage({
    //     destination:function(req,res,cb){
    //         cb(null,'./uploads')
    //     },
    
    //     function:function(req,file,cb){
    //         cb(null,file.originalname)
    //     }
    // })
    
    // let upload = multer({storage})
    
    // app.use(express.static(__dirname+'/public'))
    // app.use("./uploads",express.static('uploads'))