const cors = require("cors")
require("dotenv").config()
const multer = require("multer")
const mongoose = require("mongoose")
// const bcrypt = require("bcrypt")
const File = require("./models/File")
const fs = require("fs")
// const multerMiddleware = require('./multerMiddleware')


const express = require("express")
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        // console.log(req)
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })








const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())











const port = process.env.PORT || 9002;

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes

app.get("/", (req, res) => {
    res.send("hello home")
})
app.post("/getlist", (req, res) => {

    // res.send("server receiveedddd")
    File.find({}, (err, files) =>{

        if (err) {
            console.log(err)

        }
        else{
        res.send(files);
        }
    })

})


app.post("/download", (req, res) => {
    let ArrayOfPasswords = [];
    File.find({}, (err, files) => {
        if (err) {
            console.log(err)

        }
        else {
            files.map((element) => {
                ArrayOfPasswords.push(element.password)
            })
            // console.log(ArrayOfPasswords)
            let filen = req.body.filename

            if (ArrayOfPasswords.includes(req.body.filepassword)) {
                // console.log(req.body.password)
                // console.log("correct");
                res.download(`./uploads/${filen}`)
            }
            else {

                res.send("incorrect")
                // console.log("incorrect")

            }
        }

    })


    // console.log(req.body.filename)
})
app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})

app.post("/upload", upload.single("file"), async (req, res) => {
    
    const password = Math.floor(100000 + Math.random() * 900000);
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
        password: password

    }
        const email =    req.body.email;
        if(!fs.existsSync(`./uploads/${email}`)){
            fs.mkdirSync(`./uploads/${email}`)

            
            
        }

    const file = await File.create(fileData)
    res.send({ filename: file.originalName, password: password.toString() })
});

app.listen(port, () => {
    console.log(`BE started at port ${port}`)
})