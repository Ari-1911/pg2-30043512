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
      const fechaHora = new Date().toString();

      await this.contactosModel.crearContacto(
        name,
        email,
        comment,
        ip,
        fechaHora
      );

      const contactos = await this.contactosModel.obtenerAllContactos();
      console.log(contactos);
      res.send("Formulario enviado con exito"); // Redireccionar a página de confirmación
    } catch (error) {
      res.status(500).json({ error: "Error al guardar el contacto" });
    }
  }
}

module.exports = ContactosController;
