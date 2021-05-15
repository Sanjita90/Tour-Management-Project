const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')
const multer = require('multer')
const fs=require('fs')
const path = require('path')
const Enquiries = require("../models/enquiries_model")
const Packages = require("../models/packages_model")

const diskStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})




const upload=multer({storage:diskStorage})
const app = express()
app.use(cors())
app.use(express.json())
var admin = require("firebase-admin");

var serviceAccount = require("./package-images-firebase-adminsdk-x0ek7-9b2d565c91.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:"gs://package-images.appspot.com"
});
app.locals.bucket = admin.storage().bucket()

app.get('/packages', (req, res) => {
    console.log("get packages")
    Packages.find()
        .exec()
        .then((result) => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(404).json({ error: err })
        })
})


app.post('/packages', upload.single('package_img'), async(req, res) => {
    console.log("File: "+req.file)
  fs.readFile(path.join(__dirname+"/uploads/"+req.file.originalname), async function(err, buffer){
      console.log(buffer)
    await app.locals.bucket.file(req.file.originalname).createWriteStream().end(buffer)
    fs.unlink(path.join(__dirname+"/uploads/"+req.file.originalname),(err)=>{})
  })
      const package = new Packages({
        _id: new mongoose.Types.ObjectId,
        destination: req.body.destination,
        price: req.body.price,
        number_days: req.body.number_days,
        number_nights:req.body.number_nights,
        image_url: req.file.originalname,
        description: req.body.description
    })
    package
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err))
    res.status(201).json({
        message:"Saving package",
        createdPackage:package
    })
})

app.get('/enquiries', (req, res) => {
    console.log("get enquiries")
    Enquiries.find()
        .exec()
        .then((result) => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(404).json({ error: err })
        })
})


app.post("/enquiries", (req, res) => {
    console.log(req.body.name)
    const enquiry = new Enquiries({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        package:req.body.destination,
         country: req.body.country,
        city: req.body.city,
        contact_no: req.body.contact_no,
        email: req.body.email,
        no_of_people: req.body.no_of_people,
        comments: req.body.comments
    })
    enquiry
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err))
    res.status(201).json({
        message: "saving package",
        createdPackage: enquiry
    })
})

app.delete("/packages/:_id",(req,res)=>{
    var _id=req.params._id
    if (!Packages.findById(_id)) {
        
        return res.status(400).send();
      }
      console.log("found")
      Packages.deleteOne({_id})
      .then((result)=>{res.status(200).json()})
      .catch((err)=>{console.log("error deleting"+ err)})
})


app.delete("/enquiries/:_id",(req,res)=>{
    var _id=req.params._id
    console.log("delete pkg: "+_id)
    if (!Enquiries.findById(_id)) {
        
        return res.status(400).send();
      }
      console.log("found")
      Enquiries.deleteOne({_id})
      .then((result)=>{res.status(200).json()})
      .catch((err)=>{console.log("error deleting"+ err)})
})

app.get("/packages/:_id",(req,res)=>{
    var _id=req.params._id
    if (!Packages.findById(_id)) {
        return res.status(400).send();
      }
      Packages.findById(_id,(error,data)=>{
          if(!error){
              console.log("data found:"+data)
              res.status(200).json(data)
          }
      })
})

mongoose.connect("mongodb+srv://tourdb:tourdb@tour-management.nqrjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then((res => console.log("connected to database")))
    .catch(err => console.log("error connecting to db"))

app.listen(3000, () => {
    console.log("server running on 3000")
})