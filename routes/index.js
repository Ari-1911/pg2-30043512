const ContactosController = require("/Controllers/ContactosController.js");
const contactosController = new ContactosController();

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", indexController);

router.post("/form-contacto", contactosController.add);

module.exports = router;
