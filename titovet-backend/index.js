const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

// Rutas
const pacientesRouter = require('./routes/pacientes');
const turnosRouter = require('./routes/turnos');
app.use('/api/pacientes', pacientesRouter);
app.use('/api/turnos', turnosRouter);

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}.`);
});
