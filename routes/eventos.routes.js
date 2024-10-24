const express = require("express");
const router = express.Router();

const Evento = require("../models/Evento.model");
const Artista = require("../models/Artista.model");

//importamos función de verificación
const verifyToken = require("../middlewares/auth.middlewares");

//crear evento
router.post('/evento', verifyToken, async (req, res) => {
  const { nombre, fecha, direccion, genero, descripcion, precio, artista, image } = req.body;

  try {
    
    const promoter = req.userId; 
    const nuevoEvento = new Evento({
      nombre,
      fecha,
      direccion,
      genero,
      descripcion,
      precio,
      image,
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
    const { genero, ciudad, nombre } = req.query;
    const query = {};

    if (genero) {
      query.genero = genero;
    }

    // Si se proporciona una ciudad, añade la condición de ciudad
    if (ciudad) {
      query["direccion.ciudad"] = ciudad;
    }

    if (nombre) {
      //esto obviamente lo he buscado pero me parecia una implementacion importante de la aplicacion
      query.$or = [
        { nombre: { $regex: new RegExp(nombre, 'i') } }, // 'i' para hacer la búsqueda insensible a mayúsculas
        { artista: { $regex: new RegExp(nombre, 'i') } } // Cambia 'artista' al nombre correcto del campo en tu esquema
      ];
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

// Actualizar un evento -verify
router.put("/:eventoId",verifyToken, async (req, res,next)=>{
  try {
    const response = await Evento.findByIdAndUpdate(req.params.eventoId,{
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      fecha: req.body.fecha,
      genero: req.body.genero,
      precio: req.body.precio,
      image: req.body.image,
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
router.delete("/:eventoId",verifyToken,async (req,res,next)=>{
  try {
    await Evento.findByIdAndDelete(req.params.eventoId)
    res.status(204).json({message:"Evento eliminado"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}) 



//------------------------------------RUTAS para gestionar asistencia al evento

// Ruta para like/ asistencia
router.post("/:eventoId/asistir", verifyToken, async (req, res) => {
  const { eventoId } = req.params;
  const userId = req.payload._id;
  try {
    const evento = await Evento.findByIdAndUpdate(eventoId)

    //si no encontramos el evento porque se ha borrado mientras o lo que sea, salimos
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    //declaramos una variable para actualizar el evento 
    let update 
    // Alternar asistencia, para que sea la misma ruta asistire, que no asistire
    if (evento.asistentes.includes(userId)) {
      //si id usuario esta en asistentes, lo quitamos
      update = {$pull: {asistentes: userId}}
    } else {
      // Si no está, lo añadimos
      update ={ $addToSet : {asistentes: userId}} 
      // evento.asistentes.push(userId);
    }

   //actualizamos el evento:
   await Evento.findByIdAndUpdate(eventoId, update);

    res.status(200).json({ message: "Asistencia actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la asistencia" });
  }
});

// Ruta para desmarcar asistencia
/* router.delete("/:eventoId/asistir/:userId", verifyToken, async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const userId = req.userId;

    // Eliminar el usuario de la lista de asistentes
    const evento = await Evento.findByIdAndUpdate(
      eventoId,
    {
      $pull: { asistentes: userId }
    },{
      new: true 
    });

    if (evento.asistentes.includes(userId)) {
      evento.asistentes = evento.asistentes.filter(id => id.toString() !== userId);

      //clausula por si no carga el evento o ya se ha eliminado
      if (!evento) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }

      return res.status(200).json({ message: "Asistencia desmarcada", data: evento });
    } else {
      return res.status(400).json({ message: "No has marcado asistencia" });
    }
  } catch (error) {
    console.error("Error al desmarcar asistencia:", error);
    res.status(500).json({ error: "No se pudo desmarcar la asistencia" });
  }
}); */


module.exports = router;
