const ContactosController = require("../controllers/ContactosController.1");
const contactosController = new ContactosController();

const indexController = require("../controllers/indexController");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", indexController);

router.post("/form-contact", contactosController.add);

module.exports = router;
