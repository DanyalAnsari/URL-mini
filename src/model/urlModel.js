const mongoose=require("mongoose");
const urlSchema=new mongoose.Schema({
    urlFull:{
        type:String,
        required:true
    },
    urlShortId:{
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

module.exports={urlModel};