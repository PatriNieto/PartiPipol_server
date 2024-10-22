const User = require("../models/User.model");

//en un ppio solo tienen que estar las tres rutas definidias para auth: login,signup, verify
const router = require("express").Router();

//importamos el pquete que se encarga de cifrar las contraseñas: npm i bcrypt
const bcrypt = require("bcryptjs");

//paquete que genera el token 
const jwt = require("jsonwebtoken")

//importamos funcion de verificacion
const verifyToken = require("../middlewares/auth.middlewares")

router.get("/:userId", async (req, res, next)=>{
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el usuario' });
  }
})

router.put("/:userId", verifyToken, async (req, res, next)=>{
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, {
      imagenDePerfil : req.body.imagenDePerfil,
      username : req.body.username,
      email: req.body.email,
      password: req.body.password
    },{new:true})
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(201).json({message:"Usuario actualizado"})
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario' });
    next(error)
  }
})


 



module.exports = router
