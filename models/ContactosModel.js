const sqlite3 = require("sqlite3").verbose();
// const { rejects } = require("assert");
// const { error } = require("console");
// const { resolve } = require("path");
const { promisify } = require("util");

class ContactosModel {
  constructor() {
    this.db = new sqlite3.Database("./conf/test.db", (err) => {
      if (err) {
        console.log("No se pudo conectar a la base de datos", err.message);
        return;
      }
      console.log("Conectado con exito a la base de datos SQlite.");
    });

    this.db.run(
      "CREATE TABLE IF NOT EXISTS contactos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, comment TEXT, ip TEXT, fechaHora TEXT, pais TEXT)",
      (err) => {
        if (err) {
          console.error(err.message);
        }
      }
    );
  }

  crearContacto(name, email, comment, ip, fechaHora, pais) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO contactos (name, email, comment, ip, fechaHora, pais) VALUES (?,?,?,?,?,?)";
      this.db.exec(
        sql,
        [name, email, comment, ip, fechaHora, pais],
        function (err) {
          if (err) {
            console.error(err.message);
            reject(err);
          }
          console.log("Se ha insertado una fila con el ID ${this.lastID");
          resolve(this.lastID);
        }
      );
    });
  }

  async obtenerContacto(email) {
    const sql = "SELECT * FROM contactos WHERE email = ?";
    const get = promisify(this.db.get).bind(this.db);
    return await get(sql, [email]);
  }

  async obtenerAllContactos() {
    const sql = "SELECT * FROM contactos";
    const all = promisify(this.db.all).bind(this.db);
    return await all(sql);
  }
}

module.exports = ContactosModel;
