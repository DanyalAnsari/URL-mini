const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    User_Role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }
},
{timestamps:true}
);

UserSchema.pre('save', function(next){
    const user= this;

    user.Username=user.Username.trim();
    user.Email=user.Email.trim();

    const usernameRegex=/^[0-9A-Za-z]{3,16}$/;
    const emailRegex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if(usernameRegex.test(user.Username) && emailRegex.test(user.Email)){
        next();
    }else{
        return next(new Error('Invalid email or username format'));
    }
    
})

const User=mongoose.model('User',UserSchema)

module.exports={User}