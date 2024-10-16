const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//rutas auth, todas las que empiezan por auth 
const authRouter =  require("./auth.routes")
router.use("/auth", authRouter) 

module.exports = router;
