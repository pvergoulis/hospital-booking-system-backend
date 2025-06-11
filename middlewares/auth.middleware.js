const jwt = require('jsonwebtoken')
const authService = require('../services/auth.service')

function verifyToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if(!token){
        return res.status(401).json({status: false, message: "Access Denied. No token provided"})
    }

    const result = authService.verifyAccessToken(token)

    if(!result.verified){
        return res.status(403).json({status : false, data : result.data})
    }
     
  
    req.user = result.data
    next()
}

function verifyRoles(allowedRole){
  return (req, res, next)=>{
    if(!req.user || !req.user.roles){
      return res.status(403).json({status: false, data : "Forbidden: no roles found"})
    }

    const userRoles = req.user.roles
    const hasPermission = userRoles.includes(allowedRole)

    if(!hasPermission){
      return res.status(403).json({status : false, data: "Forbidden: insufficient permissons"})
    }
    next()
  }
}




module.exports = {verifyToken,verifyRoles}