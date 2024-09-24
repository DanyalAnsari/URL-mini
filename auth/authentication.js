const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
const saltRounds=10;

const handlePasswordHashing=(password)=>{
    const salt=bcrypt.genSaltSync(saltRounds);
    const hashPassword=bcrypt.hashSync(password,salt);
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