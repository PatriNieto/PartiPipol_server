const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const comentarioSchema = new Schema(
  {
    comentario: {
      type: String,
      required: [true,`Si quieres comentar tienes que escribir algo`],
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:"User"
    },
    evento:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:"Evento"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Comentario = model("Comentario", comentarioSchema);

module.exports = Comentario;
