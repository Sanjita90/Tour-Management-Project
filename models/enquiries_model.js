const mongoose=require("mongoose")

const enquiries=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    address:{
       district:String,
       city:String 
    },
    contact_no:{
        type: Number,
        length:10
    },
    email:String,
    no_of_people:Number,
    start_date:Date,
    comments:String
})


module.exports=mongoose.model("Enquiries",enquiries)