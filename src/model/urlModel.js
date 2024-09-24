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
    UserID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requred:true
    },
    Visits:[{
        time:{
        type:Number
    }
}]},{timeStamp:true});

urlSchema.pre('save', function(next){
    const url=this;

    url.FullURL=url.FullURL.trim();
    const urlRegex=/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(\/.*)?$/;
    if(urlRegex.test(url.FullURL)){
       return next()
    }else{
        return next(new Error('Invalid URL format'));
    }

})

const urlModel= mongoose.model('url',urlSchema);


module.exports={urlModel}