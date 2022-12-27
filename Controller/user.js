const User = require("../Models/User");

const passport = require("passport")


exports.registerUser = async (req, res) => {
    try {
        const { username, password,confirmPassword} = req.body;
        console.log( username, password,confirmPassword)
        let user = await User.findOne({ username });

        // console.log(user)

        if (user) {
            return res.status(200).json({
                sucess: false,
                message: "user alredy exist",
            });
        }

        if(password !== confirmPassword){
            return res.status(200).json({
                sucess: false,
                message: "re check your password",
            });
        }

        user = await User.create({ username, password });

        res.status(201).json({ sucess: true, user, message: "register sucessfull" });


    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}


// exports.registerUser = async (req, res) => {
//     try {


//         res.status(201).json({
//             sucess: true, user: req.user, message: "register sucessfull"
//         });


//     } catch (error) {
//         res.status(500).json({
//             sucess: false,
//             message: error.message,
//         });
//     }
// }


exports.login=async(req,res,next)=>{
    passport.authenticate("local", (err, user, info) => {
     
        if (err) throw err;
        if (!user){
           res.status(200).json({
                success: false,
                message: "user not found",
            });
        }
        else {
          req.logIn(user, (err) => {
            if (err) throw err;

            res.status(200).json({
                success: true,
                message: "login success",
            }); 
          });       
        }
      })(req, res, next);
}

exports.logout = async (req, res) => {
    try {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.status(200).json({
                success:true,
                message:"log out sucessFull"
            })
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
}


exports.profile=async(req,res)=>{
    if(req.user) {return  res.status(200).json({
        success:true,
        message:"user",
        user:req?.user
 })}
    if(!req.user) {return  res.status(200).json({
        success:false,
        message:"please login"
      
 })}
}

