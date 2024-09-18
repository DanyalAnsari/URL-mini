const { User } = require('../model/userModel');
const { handlePasswordHashing, handlePasswordVerification }=require('../../auth/authentication')


const renderRegisterationView = (req, res) => {
    res.status(200).render('signup');
}

const renderLoginView = (req, res) => {
    res.status(200).render('signin');
}

const handleRegisteration = async (req, res) => {
    const { Username, Email, Password } = req.body;
    if (!Username | !Email | !Password) {
        return res.status(400).json({ message: 'All fields required' });
    }
    try {
         const hashPassword=handlePasswordHashing(Password)
        const user = await User.create({ Username, Email, Password:hashPassword });
        res.status(201).json({ message: 'Successfully Registered' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const handleLogin =async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email | !Password) {
        return res.status(400).json({ message: 'All fields required' });;
    }
    try{
        const result= await User.findOne({Email});
        if(result){
             const {isValid}= handlePasswordVerification(Password, result.Password);
             if(isValid){
                return res.status(200).json({message:'Logged In successfully'});
             }
             else{
                return res.status(404).json({message:'Email or Password not valid'});
             }
           
        }else{
            return res.status(404).json({message:'User not found'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports={renderLoginView,renderRegisterationView,handleLogin,handleRegisteration};