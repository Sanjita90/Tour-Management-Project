const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')

const Enquiries = require("../models/enquiries_model")
const Packages = require("../models/packages_model")

const app = express()
app.use(cors())
app.use(express.json())

app.get('/packages', (req,res) => {
    console.log("get packages")
    Packages.find()
    .exec()
    .then((result)=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(404).json({error:err})
    })
})


app.post('/packages',(req,res)=>{
    const package=new Packages({
        _id:new mongoose.Types.ObjectId,
        destination:req.body.destination,
        price:req.body.price,
        number_days:req.body.days,
        image_url:req.body.image_link        
    })
package
.save()
.then(result=>console.log(result))
.catch(err=>console.log(err))
res.status(201).json({
    message:"saving package",
    createdPackage:package
})
})


app.get('/enquiries', (req,res) => {
    console.log("get enquiries")
    Enquiries.find()
    .exec()
    .then((result)=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(404).json({error:err})
    })
})


app.post("/enquiries",(req,res)=>{
    const enquiry=new Enquiries({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        address:{
            district:req.body.address.district,
            city:req.body.address.city,
        },
        contact_no:req.body.contact_no,
        email:req.body.email,
        no_of_people:req.body.no_of_people,
        start_date:new Date(req.body.start_date),
        comments:req.body.comments
    })
enquiry
.save()
.then(result=>console.log(result))
.catch(err=>console.log(err))
res.status(201).json({
    message:"saving package",
    createdPackage:enquiry
})
})

mongoose.connect("mongodb://localhost:27017/travel-management",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then((res=>console.log("connected to database")))
.catch(err=>console.log("error connecting to db"))

app.listen(3000, () => {
    console.log("server running on 3000")
})
