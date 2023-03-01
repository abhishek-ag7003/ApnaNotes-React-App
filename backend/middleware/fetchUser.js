const jwt = require('jsonwebtoken')
const JWT_SECRET = "thisIsSecretKey";


const fetchUser = (req,res,next)=>{
    // Get the user from jwt token and add it to request object
    const token = req.header('auth-token')
    if(!token){
        res.status(400).json({error:"Access denied"})
    }
    try {
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user
    next();
    } catch (error) {
        res.status(401).send('Please authenticate with valid token')
    }
    
}

module.exports = fetchUser;