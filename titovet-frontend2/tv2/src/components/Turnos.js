import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export function Turnos() {

    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        const fetchTurnos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/turnos');
                const data = await response.json();

                setTurnos(data);
            } catch (error) {
                console.error("Error fetching turnos:", error);
            }
        };

        fetchTurnos();
    }, []);

    const deleteTurno = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/turnos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the turno from the local state
                setTurnos((prevTurnos) => prevTurnos.filter(turno => turno._id !== id));
                alert('Turno deleted successfully!');
            } else {
                const data = await response.json();
                alert('Error deleting turno: ' + data.message);
            }
        } catch (error) {
            console.error('There was an error deleting the turno:', error);
        }
    };

    return (
        <>
            <h2>Turnos</h2>
            <ul>
                {
                    turnos?.map((turno) => (                        
                        <li key={turno.id}>
                            {turno.fecha} | {turno.veterinario} | {turno.hora} 
                            <button onClick={() => deleteTurno(turno._id)}>Delete</button>
                        </li>                        
                    ))
                }
            </ul>
            <Link to='new-turno'>
                <button>Guardar nuevo turno</button>
            </Link>
        </>
    );
}
