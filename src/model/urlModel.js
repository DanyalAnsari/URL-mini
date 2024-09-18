const mongoose=require("mongoose");
const urlSchema=new mongoose.Schema({
    FullURL:{
        type:String,
        required:true
    },
    URLShortId:{
        type:String,
        required:true,
        unique:true
    },
    visits:[{
        time:{
        type:Number
    }
}]},{timeStamp:true});

const urlModel= mongoose.model('url',urlSchema);


module.exports={urlModel}