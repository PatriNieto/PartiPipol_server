const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//rutas auth, todas las que empiezan por auth 
const authRouter =  require("./auth.routes")
router.use("/auth", authRouter) 

//rutas artistas - eliminar esto 
/* const artistaRouter = require("./artistas.routes")
router.use("/artistas", artistaRouter) */

//rutas eventos
const eventoRouter = require("./eventos.routes")
router.use("/eventos", eventoRouter)

//rutas comentarios
const comentarioRouter = require("./comentarios.routes")
router.use("/comentarios", comentarioRouter)

//llamada API
const artistRouter = require("./artists.routes");
router.use("/artists", artistRouter);

//ruta obtencion datos usuario
const userRouter = require("./user.routes")
router.use("/user", userRouter);

// Ruta de verificación
router.get("/", (req, res) => {
  res.json("Todo bien!");
});

//ruta de Cloudinary
// in routes/index.routes.js

// ...

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

// ...


module.exports = router;
