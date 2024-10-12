const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
const saltRounds=10;

const handlePasswordHashing=async(password)=>{
    const salt=await bcrypt.genSaltSync(saltRounds);
    const hashPassword=await bcrypt.hashSync(password,salt);
    return hashPassword;
}

const handlePasswordVerification=(inputPassword, password)=>{
    const isValid=bcrypt.compareSync(inputPassword, password);
    return isValid;
}

const handleTokenGeneration=(userInfo)=>{
    const payload={
        id:userInfo._id.toString(),
        Name:userInfo.Username,
        Email:userInfo.Email
    }
    const token=JWT.sign(payload, process.env.SECRET_KEY,{expiresIn:'2h'});
    return token;
}

module.exports={handlePasswordHashing, handlePasswordVerification, handleTokenGeneration};