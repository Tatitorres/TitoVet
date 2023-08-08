const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');

// Obtener todos los turnos
router.get('/', async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo turno
router.post('/', async (req, res) => {
  const turno = new Turno(req.body);
  try {
    const nuevoTurno = await turno.save();
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener un turno por su ID
router.get('/:id', getTurno, (req, res) => {
  res.json(res.turno);
});

// Actualizar un turno por su ID
router.patch('/:id', getTurno, async (req, res) => {
  if (req.body.detalleCita) {
    res.turno.detalleCita = req.body.detalleCita;
  }
  if (req.body.veterinario) {
    res.turno.veterinario = req.body.veterinario;
  }
  if (req.body.mascota) {
    res.turno.mascota = req.body.mascota;
  }
  if (req.body.fecha) {
    res.turno.fecha = req.body.fecha;
  }
  if (req.body.hora) {
    res.turno.hora = req.body.hora;
  }

  try {
    const turnoActualizado = await res.turno.save();
    res.json(turnoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to fetch a Turno by its ID
async function getTurno(req, res, next) {
  let turno;
  try {
    turno = await Turno.findById(req.params.id);
    if (!turno) {
      return res.status(404).json({ message: 'Cannot find Turno' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.turno = turno;
  next();
}

// Delete route
router.delete('/:id', getTurno, async (req, res) => {
    try {
      await Turno.deleteOne({ _id: req.params.id });
      res.json({ message: 'Turno deleted successfully!' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
