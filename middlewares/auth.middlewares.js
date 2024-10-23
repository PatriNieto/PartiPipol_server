const jwt = require("jsonwebtoken")

function verifyToken(req,res,next){
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    //cogemos el campo authorization del header y le cortamos la palabra Bearer
    const tokenArr = req.headers.authorization.split(" ")
    const token = tokenArr[1]
    console.log("Token recibido: ", token)
    const payload = jwt.verify(token, process.env.TOKEN_SECRET) 

    //enviamos este payload al front para que cada llaamda que incluya esta función tenga la información
    req.payload = payload
    req.userId = payload._id

    console.log("Token verificado, usuario Id: ", req.userId)
    next()
  } catch (error) {
    console.log("error en verifyToken", error)
    //unauthorized
    res.status(401).json({message: "Token no valido"})
  }
}

module.exports = verifyToken