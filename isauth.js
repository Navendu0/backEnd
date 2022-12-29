exports.isAuth= (req,res,next)=>{
    try {
       console.log("in is auth")
        if (req.isAuthenticated()) {
                   console.log("in is auth if 2")

            return next()
          }

           res.status(403).json({
            success:false,
            message:"please login"
           })

         
        // if(req.user){
        //      res.status(200).json({ sucess: true, user:req.user })
        //      console.log(req.user)
       
        // }
    
        // if(!req.user){
        //      res.status(404).json({ sucess: false,message:"user not found" })
        //      console.log("no user")
        // }
    
    } catch (error) {
           res.status(500).json({
            sucess: false,
            message: error.message,
          });
    }
    
}
