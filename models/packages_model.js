const mongoose=require("mongoose")

const package=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    destination:String,
    price:Number,
    number_days:Number,
    image_url:String
})

module.exports=mongoose.model("Package",package)