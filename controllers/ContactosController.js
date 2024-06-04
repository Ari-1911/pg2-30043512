const ContactosModel = require("../models/ContactosModel");

class ContactosController {
  constructor() {
    this.contactosModel = new ContactosModel();
  }

  async add(req, res) {
    try {
      // Validar los datos del formulario
      const { name, email, comment } = req.body;

      if (!name || !email || !comment) {
        res.status(400).send("Faltan campos requeridos");
        return;
      }
      const ip = req.ip;
      const fechaHora = new Date();

      await this.contactosModel.agregarContacto(
        name,
        email,
        comment,
        ip,
        fechaHora
      );
      res.redirect("/confirmacion"); // Redireccionar a página de confirmación
    } catch (error) {
      res.status(500).json({ error: "Error al guardar el contacto" });
    }
  }
}

module.exports = ContactosController;
