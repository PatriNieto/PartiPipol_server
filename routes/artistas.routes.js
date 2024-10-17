const express = require("express")
const router = express.Router()

const Artista = require("../models/Artista.model")

router.post("/artista", async (req, res,next)=>{

  //clausulas de guardia, tercer nivel de seguridad
  if(!req.body.nombre){
    res.status(400).json({message:"El campo nombre es obligatorio"})
    //si esto ocurre salimos y no crea artista
    return
  }

 

  try {
    const response = await Artista.create({
      nombre: req.body.nombre,
      imagen: req.body.imagen,
      biografia: req.body.biografia,
      enlaces: {
        spotify: req.body.enlaces.spotify,
        instagram: req.body.enlaces.instagram
      }
    }) 
     console.log("PASAMOS POR AQUI",response)
    res.status(201).json({data:response}) 
  } catch (error) {
    console.log("estamos en el catch",error)
    next(error)
  }
})

// devolver todos los artistas
 router.get("/", (req,res,next) => {
  Artista.find({})
    .then((artistas) => {
      console.log("Artistas ->", artistas);
      res.json(artistas)
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
}) 

//Devolver un artista por Id

router.get("/:artistaId", async (req, res,next)=>{
  try {
    const response = await Artista.findById(req.params.artistaId)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
      next(error)
  }
}) 


// Actualizar un artista
 router.put("/:artistaId", async (req, res,next)=>{
  try {
    const response = await Artista.findByIdAndUpdate(req.params.artistaId,{
      nombre: req.body.nombre,
      imagen: req.body.imagen,
      biografia: req.body.biografia,
      enlaces: {
        spotify: req.body.enlaces.spotify,
        instagram: req.body.enlaces.instagram
      }
    },{new:true})
    // console.log(req.body)
    res.status(201).json({message:"Artista actualizado"})
  } catch (error) {
    console.log(error)
      next(error)
  } 
})



// borrar un artista
router.delete("/:artistaId",async (req,res,next)=>{
  try {
    await Artista.findByIdAndDelete(req.params.artistaId)
    res.status(204).json({message:"Artista eliminado"})
  
  } catch (error) {
    console.log(error)
    next(error)
  }
}) 

module.exports = router