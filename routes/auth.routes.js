const User = require("../models/User.model");

//en un ppio solo tienen que estar las tres rutas definidias para auth: login,signup, verify
const router = require("express").Router();

//importamos el pquete que se encarga de cifrar las contraseñas: npm i bcrypt
const bcrypt = require("bcryptjs");

//paquete que genera el token 
const jwt = require("jsonwebtoken")

//importamos funcion de verificacion
const verifyToken = require("../middlewares/auth.middlewares")

// signup
// "/api/auth" ya esta definido en el servidor
//POST "/api/auth/signup" recibe los datos del usuario y lo crea en la db
router.post("/signup", async (req,res,next)=>{

  const {email, password, username} = req.body

  //validaciones de backend, tercer nivel de seguridad
  //los campos son obligatorios
  if(!email || !password || !username){
    //400 bad request
    res.status(400).json({message:"Todos los campos son obligatorios"})
    //si esto ocurre salimos y no crea usuario
    return
  }

  //la contraseña tiene al menos 8 caracteres, con minusculas, mayusculas, verificacion global y 
  ///^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm --> regexr.com
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if(regexPassword.test(password)===false){
    //400 bad request
    res.status(400).json({message:"La contraseña no es válida, debe terner entre 8 y 16 caracteres entre mayúsculas, minúsculas y números"})
    //si esto ocurre salimos y no crea usuario
    return
  }

  //el email debe tener estructura de mail
  const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  if(regexEmail.test(email)===false){
    //400 bad request
    res.status(400).json({message:"El mail debe ser una dirección de correo electrónico: usuario@example.com"})
    //si esto ocurre salimos y no crea usuario
    return
  }


  try {


  //el email es unico - required in model 
    const foundUser = await User.findOne({email:email})
    if(foundUser){
      res.status(400).json({message:"El correo ya esta registrado"})
      //si esto ocurre salimos y no crea usuario
      return
    }
    //el usuario es unico - required in model 
    const foundUser2 = await User.findOne({username:username})
    if(foundUser2){
      res.status(400).json({message:"Ya existe un usuario con ese nombre"})
      //si esto ocurre salimos y no crea usuario
      return
    }

    //ciframos la contraseña antes de crear el usuario y despues de las comprobaciones
    //las marcamos como await para que se cifren en el servidor de bcrypt, si queremos en nuestro servidro son otros metodos, mirar doc
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

  await User.create(
    {email,
    password:hashPassword,
    username}
  )
  //201 - created - no tiene respuesta? 
  res.sendStatus(201)

    
  } catch (error) {
    next(error)
  }
  
 


})


// login
//POST "/api/auth/login" recibe los datos de sesión del usuario y lo autentica
//Tambien envia el token
router.post("/login",async(req,res,next)=>{

  const {username, password } = req.body

  //que todos los datos esten correctos:
  //esto se comprueba antes de mandar al servidor, en el try lo que tiene que hacer el servidor
  if(!username || !password ){
     //400 bad request
     res.status(400).json({message:"Todos los campos son obligatorios"})
     //si esto ocurre salimos y no crea usuario
     return
  }

  try {
    const foundUser = await User.findOne({username:username})
    if(!foundUser){
      //400 bad request
     res.status(400).json({message:"Usuario no encontrado"})
     //si esto ocurre salimos y no crea usuario
     return
    }

    //validar contraseña
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if(!isPasswordCorrect){
        //400 bad request
     res.status(400).json({message:"La contraseña no es correcta"})
     //si esto ocurre salimos y no crea usuario
     return
    }

    //ahora debemos enviar el token al usuario, para que pueda acceder a paginas 
    //npm i jsonwebtoken --> paquete que utilizaremos para generar el token de usuario
    //creamos el payload con informacion estatica del usuario, esto es 

    const payload = {
      _id:foundUser._id,
      email: foundUser.email,
      username: foundUser.username}

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET,{
        algorithm: "HS256",
        expiresIn: "30d"
      } )

        //enviamos que ok y el token al FE
     res.status(200).json({authToken:authToken})

  } catch (error) {
    next(error)
  }
})


//verify
//GET "api/auth/verify" recibe el token y lo valida. 
//Ruta para cuando el usuario vuelve a la app

router.get("/verify",verifyToken, (req,res)=>{



  res.status(200).json(req.payload)

})

module.exports = router
