const express = require("express");
const router = express.Router();
//importamos modelo comentario
const Comentario = require("../models/Comentarios.model")
//importamos función de verificación
const verifyToken = require("../middlewares/auth.middlewares");

//crear comentario
router.post('/:eventoId', verifyToken, async (req, res) => {
  const { comentario } = req.body
  //el usuario lo define el token
  const usuario = req.payload._id
  //al evento lo define la pagina en la que nos encontramos
  const { eventoId } = req.params

  try {
    const nuevoComentario = new Comentario({
      comentario,
      usuario,
      evento:eventoId
    });

    //aplicamos populate en la respuesta
    const comentarioConUsuario = await nuevoComentario.populate("usuario")

    await nuevoComentario.save();
    res.status(201).json({ message: 'Comentario creado', data: comentarioConUsuario });
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    res.status(500).json({ error: "No se pudo crear el comentario" });
  }
});


// ver todos los comentarios de un evento
router.get("/:eventoId", async (req, res, next) => {
     // Obtiene los parámetros de consulta
  const { eventoId } = req.params

  try {
 
    // Busca los ccomentarios en la base de datos con el objeto de consulta
    const comentarios = await Comentario.find({evento: eventoId}).populate("usuario");

    // Devuelve los eventos encontrados
    res.status(200).json(comentarios);
  } catch (error) {
    console.log("error comentarios", error);
    next(error);
  }
});

//borrar un comentario
router.delete("/:comentarioId", verifyToken, async (req, res) => {
  const { comentarioId } = req.params;
  const usuario = req.payload._id; 
  try {
    const comentario = await Comentario.findById(comentarioId);
    // Verifica si el usuario es el autor del comentario
    if (comentario.usuario.toString() !== usuario) {
      return res.status(403).json({ error: "Solo puedes borrar tus propios comentarios" });
    }

    await Comentario.findByIdAndDelete(comentarioId);
    res.status(204).json({ message: "Comentario eliminado" });
  } catch (error) {
    console.log("Error al eliminar el comentario:", error);
    res.status(500).json({ error: "No se pudo eliminar el comentario" });
  }
});


module.exports = router;
