const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//rutas auth, todas las que empiezan por auth 
const authRouter =  require("./auth.routes")
router.use("/auth", authRouter) 

//rutas artistas
const artistaRouter = require("./artistas.routes")
router.use("/artistas", artistaRouter)

//rutas eventos
const eventoRouter = require("./eventos.routes")
router.use("/eventos", eventoRouter)

//llamada API
const artistRouter = require("./artists.routes");
router.use("/artists", artistRouter); 

// Ruta de verificación
router.get("/", (req, res) => {
  res.json("Todo bien!");
});

module.exports = router;
