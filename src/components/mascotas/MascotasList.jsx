import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MascotasForm from "./MascotasForm";
import mascotasApi from "../../api/api";


function MascotasList({ lista, onAdd, onDelete, onUpdateEstado }) {
    const [estados, setEstados] = useState([]);
    const fetchEstados = async () => {
        try {
            const response = await mascotasApi.get("choices/");
            setEstados(response.data.estado);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchEstados();
    }, [])

    return (
        <>
            <h2>Lista mascotas</h2>

            <MascotasForm onAdd={onAdd} />

            {
                lista.map(m =>
                (
                    <div key={m.id}>
                        <h3>{m.nombre}</h3>
                        <img src={m.imagen} />
                        <p>{m.descripcion}</p>
                        <p>Edad: {m.edad}</p>
                        <p>Raza: {m.raza}</p>
                        <label>Estado:
                            <select 
                                value={m.estado} 
                                onChange={(e) => onUpdateEstado(m.id, e.target.value)}
                            >
                                {
                                    estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                                }
                            </select>
                        </label>
                        <Link to={`${m.id}`}>Ver mascota</Link>
                        <button onClick={() => onDelete(m.id)} >Eliminar</button>

                    </div>
                )
                )

            }
           
        </>
    )
}

export default MascotasList;