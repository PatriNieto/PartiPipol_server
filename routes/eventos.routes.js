const express = require("express");
const router = express.Router();

const Evento = require("../models/Evento.model");
const Artista = require("../models/Artista.model");

//importamos función de verificación
const verifyToken = require("../middlewares/auth.middlewares");

//crear evento
router.post("/evento", async (req, res, next) => {
    try {
        let artistaId;
        console.log(req.body.artista)

        // Intentar encontrar el artista en la base de datos
        const existeArtista = await Artista.findOne({ nombre: req.body.artista });

        if (existeArtista) {
            // Si el artista existe, usar su ID
            artistaId = existeArtista._id;
        } else {
            // Si no existe, crear el artista
            const newArtista = await Artista.create({ nombre: req.body.artista });
            artistaId = newArtista._id;
        }

        // Crear el evento con el ID del artista
        await Evento.create({
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            direccion: {
                calle: req.body.direccion.calle,
                ciudad: req.body.direccion.ciudad
            },
            artista: artistaId,
            genero: req.body.genero,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            promoter: req.userId
        });

        res.status(201).json({ message: "Evento creado correctamente" });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//ver todos los eventos

 router.get("/", async (req,res,next)=>{
  Evento.find({})
  .then((eventos)=>{
    console.log("Eventos ->", eventos);
      res.json(eventos)
  })
  .catch((error)=>{
    console.log(error)
      next(error)
  })
}) 

//ver los detalles de un evento

router.get("/:eventoId", async (req, res,next)=>{
  try {
    const response = await Evento.findById(req.params.eventoId)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
      next(error)
  }
}) 

// Actualizar un evento
router.put("/:eventoId", async (req, res,next)=>{
  try {
    const response = await Evento.findByIdAndUpdate(req.params.eventoId,{
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      fecha: req.body.fecha,
      genero: req.body.genero,
      precio: req.body.precio,
      direccion: {
        calle: req.body.direccion.calle,
        ciudad: req.body.direccion.ciudad
      }, 
      artista: req.body.artista
    },{new:true})
    // console.log(req.body)
    res.status(201).json({message:"Evento actualizado"})
  } catch (error) {
    console.log(error)
      next(error)
  } 
})

//borrar un evento
router.delete("/:eventoId",async (req,res,next)=>{
  try {
    await Evento.findByIdAndDelete(req.params.eventoId)
    res.status(204).json({message:"Evento eliminado"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}) 




module.exports = router;
