const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },  
    username:{
      type: String,
      required: [true, 'Debes introducir un nombre de usuario'],
      unique: true,
      trim: true

    },
   /*    imagenDePerfil: {
          type: String, //(subir)
    },
    role:{
      type:String,
      Enum: ["user","admin"],
      default: "user"
    }
 */

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
)

const User = model("User", userSchema);

module.exports = User;
