const express = require("express");
const router = express.Router();

const Evento = require("../models/Evento.model");
const Artista = require("../models/Artista.model");

//importamos función de verificación
const verifyToken = require("../middlewares/auth.middlewares");

//crear evento
router.post('/evento', verifyToken, async (req, res) => {
  const { nombre, fecha, direccion, genero, descripcion, precio, artista } = req.body;

  try {
    
    const promoter = req.userId; 
    const nuevoEvento = new Evento({
      nombre,
      fecha,
      direccion,
      genero,
      descripcion,
      precio,
      promoter,
      artista
    });

    await nuevoEvento.save();
    res.status(201).json({ message: 'Evento creado', data: nuevoEvento });
  } catch (error) {
    console.error("Error al crear el evento:", error);
    res.status(500).json({ error: "No se pudo crear el evento" });
  }
});


// ver todos los eventos
router.get("/", async (req, res, next) => {
  try {
    // Obtiene los parámetros de consulta
    const { genero, ciudad } = req.query;
    const query = {};

    if (genero) {
      query.genero = genero;
    }

    // Si se proporciona una ciudad, añade la condición de ciudad
    if (ciudad) {
      query["direccion.ciudad"] = ciudad;
    }
     
    // Busca los eventos en la base de datos con el objeto de consulta
    const eventos = await Evento.find(query);

    // Devuelve los eventos encontrados
    res.status(200).json(eventos);
  } catch (error) {
    console.log(error);
    next(error);
  }
});



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
