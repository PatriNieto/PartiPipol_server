const router = require("express").Router();

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


module.exports = router;
