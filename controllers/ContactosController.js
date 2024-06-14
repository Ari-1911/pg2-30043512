require("dotenv").config();
const ContactosModel = require("../models/ContactosModel");
const nodemailer = require("nodemailer");
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;
const USER_DESTINO1 = process.env.USER_DESTINO1;
const USER_DESTINO2 = process.env.USER_DESTINO2;

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
    // Hacer una solicitud a la API de geolocalización
    fetch("https://api.ipgeolocationapi.com/geolocate")
      .then((response) => response.json())
      .then((data) => {
        const country = data.country_name;
        // Guardar el país en la base de datos
        // Código para almacenar el país en la base de datos
      })
      .catch((error) => {
        console.error("Error al obtener la geolocalización:", error);
      });
  }
}

module.exports = ContactosController;
