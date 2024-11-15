const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.protectedRoute = async (req, res, next)=> {
    const accessToken = req.headers.authorization

    if(!accessToken){
        return res.status(403).json({message: 'Access Denied, please login'})
    }

    try{
        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        req.user = {id: decodedAccessToken.userId}
        next()
    } catch(error){
        return res.status(401).json({message: 'Access Token Invalid or Expired'});
    }
}