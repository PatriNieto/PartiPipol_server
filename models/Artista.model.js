const { Schema, model } = require("mongoose");



const artistaSchema = new Schema(
  {
    nombre: {   
      type: String,
      required: [true, "Debes indicar un nombre"],
      unique: true,
  }, 
  imagen:{	
      type: String
  }, 

  biografia:{	
      type: String
  }, 
  enlaces:{
    spotify :{
      type: String
    },
    instagram:{
      type: String
    }}
  });

const Artista = model("Artista", artistaSchema);

module.exports = Artista;
