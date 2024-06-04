const ContactosModel = require("../models/ContactosModel");
const nodemailer = require("nodemailer");
const {
  USER_EMAIL,
  USER_PASS,
  USER_DESTINO1,
  USER_DESTINO2,
} = require("./ContactosController");

class ContactosController {
  constructor() {
    this.contactosModel = new ContactosModel();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: USER_EMAIL,
        pass: USER_PASS,
      },
    });
  }

  async add(req, res) {
    // Validar los datos del formulario
    const { name, email, comment } = req.body;

    if (!name || !email || !comment) {
      res.status(400).send("Faltan campos requeridos");
      return;
    }
    //Guardar los datos del formulario
    const ip = await this.obtenerIp(ip);
    const fechaHora = new Date().toISOString();
    const pais = await this.obtenerPais(ip);

    await this.contactosModel.crearContacto(
      name,
      email,
      comment,
      ip,
      fechaHora,
      pais
    );

    enviarCorreo(name, email, comment);
    {
      const mailOptions = {
        from: USER_EMAIL,
        to: [email, USER_DESTINO1, USER_DESTINO2],
        subject: "Registro de formulario",
        text:
          "Usuario: " + name + "\nEmail: " + email + "\nComentario: " + comment,
      };

      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo enviado con éxito.");
        }
      });
    }

    obtenerIp();
    {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip; // Retorna la ip
      } catch (error) {
        console.error("Error al obtener la ip:", error);
        return null; // Retorna null si hay un error
      }
    }
  }
}
exports.ContactosController = ContactosController;
