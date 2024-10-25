const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const eventoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true,`Debes indicar un nombre`],
      unique: true
    },
    fecha: {
      //si tengo tiempo se lo paso a new Date para generar 
      type: Date,
      required: [true, "Debes indicar una fecha"],
    },
    direccion: {
    calle: {
      type: String,
      required: [true, "Debes indicar una calle"],
    },
    ciudad: {
      type: String,
      enum: ["Madrid", "Barcelona", "Bilbao", "Valencia", "Málaga","otra"],
      required: [true, "Debes indicar una ciudad"],
    }}, 
    artista: {  
      type: String
    },
    genero:{
      type: [String],
      enum: ["Electronica", "Jazz", "Rock", "Pop", "Latina",""]
    }, 
    descripcion: {
      type:String,
      required: true
    },
    precio:{
      type: Number,
      min: [0, "El precio no puede ser menor que 0"],
      required: true
    },
    promoter: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:"User"
        },
        image:{
          type:String
        },
    asistentes: {
          type: [mongoose.Schema.Types.ObjectId], 
          ref:"User"
            }
    
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Evento = model("Evento", eventoSchema);

module.exports = Evento;
