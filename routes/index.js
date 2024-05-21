<<<<<<< HEAD
=======
const ContactosController = require("/Controllers/ContactosController.js");
const contactosController = new ContactosController();

>>>>>>> 5ba9dee0568b1da6842875d97bf3d4313c38701a
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "¡¡Hola Mundo!!" });
});

module.exports = router;
