 
 const multer = require("multer")
 module.exports =((req,res,next)=>{

    const email=req.body.email;
   

    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            // console.log(req)
            cb(null, `uploads/${email}`)
        },
        filename: function (req, file, cb) {
          
            cb(null, file.originalname)
        },
    })
    
    const upload = multer({ storage: storage })
 
    upload.single("file")
    next();
})




