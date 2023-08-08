const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');

// Obtener todos los pacientes
router.get('/', async (req, res) => {
  console.log('ENTRAMOS ACÁ')
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo paciente
router.post('/', async (req, res) => {
  const paciente = new Paciente(req.body);
  try {
    const nuevoPaciente = await paciente.save();
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener un paciente por su ID
router.get('/:id', getPaciente, (req, res) => {
  res.json(res.paciente);
});

// Actualizar un paciente por su ID
router.patch('/:id', getPaciente, async (req, res) => {
  if (req.body.nombre) {
    res.paciente.nombre = req.body.nombre;
  }
  if (req.body.apellido) {
    res.paciente.apellido = req.body.apellido;
  }
  if (req.body.email) {
    res.paciente.email = req.body.email;
  }
  if (req.body.telefono) {
    res.paciente.telefono = req.body.telefono;
  }
  if (req.body.direccion) {
    res.paciente.direccion = req.body.direccion;
  }

  try {
    const pacienteActualizado = await res.paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un paciente por su ID
router.delete('/:id', getPaciente, async (req, res) => {
  try {
    await res.paciente.remove();
    res.json({ message: 'Paciente eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getPaciente(req, res, next) {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (paciente == null) {
      return res.status(404).json({ message: 'Paciente no encontrado.' });
    }
    res.paciente = paciente;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
