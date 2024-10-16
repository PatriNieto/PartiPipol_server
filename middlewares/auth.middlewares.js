const jwt = require("jsonwebtoken")
function verifyToken(req,res,next){

  try {
    //cogemos el campo authorization del header y le cortamos la palabra Bearer
    const tokenArr = req.headers.authorization.split(" ")
     const token = tokenArr[1]
    const payload = jwt.verify(token, process.env.TOKEN_SECRET) 
    //enviamos este payload al front para que cada llaamda que incluya esta función tenga la información
    req.payload = payload
    next()
  } catch (error) {
    //unauthorized
    res.status(401).json({message: "Token no valido"})
  }
}

module.exports = verifyToken