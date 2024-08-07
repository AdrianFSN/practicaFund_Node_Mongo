const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión:", err);
});

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB en", mongoose.connection.name);
});

//mongoose.connect('mongodb://127.0.0.1:27017/practicanode'); // Crear la conexión a la BD de la práctica
mongoose.connect(process.env.DATABASE_URI); // Crear la conexión a la BD de la práctica

module.exports = mongoose.connection;
