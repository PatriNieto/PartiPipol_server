const app = require("./app");
const Evento = require("./models/Evento.model");
const mongoose = require("mongoose");


// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

//CRUD Artistas

//importamos el modeloa

//crear artista 




//CRUD eventos

//crear evento 
/* app.post("/evento", async(req,res)=>{

  const {nombre,fecha,direccion: { calle, ciudad },artista,genero,descripcion,precio, promoter} = req.body
  
  try {

    await Evento.create({nombre,fecha,direccion: { calle, ciudad },artista,genero,descripcion,precio, promoter})
    res.send("todo ok, todo creado")
  } catch (error) {
    console.log(error)
  }
}) */

//