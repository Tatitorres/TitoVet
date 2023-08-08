import React, { useState } from 'react';

export function CreateTurno() {
  const [turno, setTurno] = useState({
    detalleCita: '',
    veterinario: '',
    mascota: '',
    fecha: '',
    hora: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurno((prevTurno) => ({
      ...prevTurno,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the `turno` object to your API to save it in the database
      const response = await fetch('http://localhost:5000/api/turnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(turno),
      });
      
      if (response.ok) {
        alert('Turno created successfully!');
        // Reset the form if necessary
        setTurno({
          detalleCita: '',
          veterinario: '',
          mascota: '',
          fecha: '',
          hora: '',
        });
      } else {
        const data = await response.json();
        alert('Error creating turno: ' + data.message);
      }
    } catch (error) {
      console.error('There was an error creating the turno:', error);
    }
  };

  return (
    <div>
      <h2>Create Turno</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Detalle Cita:</label>
          <input type="text" name="detalleCita" value={turno.detalleCita} onChange={handleChange} required />
        </div>
        <div>
          <label>Veterinario:</label>
          <input type="text" name="veterinario" value={turno.veterinario} onChange={handleChange} required />
        </div>
        <div>
          <label>Mascota:</label>
          <input type="text" name="mascota" value={turno.mascota} onChange={handleChange} required />
        </div>
        <div>
          <label>Fecha:</label>
          <input type="date" name="fecha" value={turno.fecha} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora:</label>
          <input type="time" name="hora" value={turno.hora} onChange={handleChange} required />
        </div>
        <button type="submit">Create Turno</button>
      </form>
    </div>
  );
}
