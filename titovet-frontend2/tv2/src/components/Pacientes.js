import { useEffect, useState } from "react"

export function Pacientes() {

    const [pacientes, setPacientes] = useState([])

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/pacientes');
                const data = await response.json();

                setPacientes(data);
            } catch (error) {
                console.error("Error fetching pacientes:", error);
            }
        };

        fetchPacientes();
    }, []) //esto se ejectuta al comienzo del componente

    return (
        <>
            <h2>Pacientes</h2>
            <ul>
                {
                    pacientes?.map((paciente)=>(                        
                        <li key={paciente.id}>
                            {paciente.nombre} | {paciente.apellido}
                        </li>                        
                    ))
                }
            </ul>
        </>
    )
}