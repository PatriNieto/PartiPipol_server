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
       imagenDePerfil: {
          type: String, //(subir)
          default:"https://media.istockphoto.com/id/1687018104/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=PDi0AqXTtZ6d2Y7ahkMJEraVrC_fYCvx0HW508OWg-4="
    }

    /*
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
