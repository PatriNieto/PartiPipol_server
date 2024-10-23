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
      type: String,
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
      required: true
    },
    promoter: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:"User"
        },
        image:{
          type:String,
          default:"https://static.ra.co/images/clubs/lg/18aniversarioo3.jpg?dateUpdated=1698676608907"
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
