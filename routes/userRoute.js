const router=require('express').Router();
const {renderLoginView,renderRegisterationView,handleLogin,handleRegisteration}=require('../src/controller/userController')

router.get('/signup', renderRegisterationView);
router.get('/signin', renderLoginView);
router.post('/signup', handleRegisteration);
router.post('/signin', handleLogin);

module.exports=router