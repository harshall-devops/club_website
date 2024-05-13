const mongoose=require('mongoose');

//Schema for storing the query information obtained through the form at Contact-Us module.

const InfoSchema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    contact:{
        type:Number
    },
    query:{
        type:String
    },
    status:{
        type:String
    }
})

const Info=new mongoose.model("queryinformations",InfoSchema)
module.exports=Info;
