const JWT = require('jsonwebtoken')
const { User } = require('../model/userModel')
const Secret = process.env.SECRET_KEY


const isAuthenticated = async (req, res, next) => {
  const tokenValue = req.cookies['token']
  if (!tokenValue) {
    return res.render('home', { message: 'PLease signin to continue' });
  }
  try {
    const payload = JWT.verify(tokenValue, Secret)
    if (payload) {
      const user = await User.findOne({ _id: payload.id })
      if (!user) {
        return res.status(400).render('home', { error: 'Bad Request' })
      } else {
        res.locals.user = user
        return next();
      }
    }
  } catch (error) {
    console.log(error)
    return res.render('home', { error: 'Invalid token. Please sign in again.' });
  }
}


module.exports = { isAuthenticated }