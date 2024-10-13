
const urlModel = require('../model/urlModel');

const urlHandler = (req, res, next) => {

    const { url } = req.body;
    if (!{ url }) {
        res.statue(400).json({ message: 'Bad Request' })
    }
    else {
        return next();
    }
}

const isValidLoginInput = (req, res, next) => {
    const input = req.body;
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const validEmail = emailRegex.test(input.Email) ? true : false;
    if (req.originalUrl === '/user/signup') {
        const usernameRegex = /^[0-9A-Za-z]{3,16}$/;
        if (validEmail && usernameRegex.test(input.Username)) {
            next();
        } else {
            return res.render('signup', { error: validEmail ? `Invalid username format` : ` invalid username format` });
        }
    }
    if(!validEmail)
    {
        res.status(400).render('signin', { error:'invalid username or password' });
    }else{
        next()
    }
}
module.exports = { urlHandler, isValidLoginInput }