import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MascotasForm from "./MascotasForm";
import mascotasApi from "../../api/api";

const colorPorEstado = {
    perdida: "danger",
    encontrada: "warning",
    en_adopcion: "info",
    adoptada: "success",
}

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

    const obtenerLabelEstado = (valor) => {
        const encontrado = estados.find(e => e.value === valor);
        return encontrado ? encontrado.label : valor;
    }

    useEffect(() => {
        fetchEstados();
    }, [])

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4" style={{fontFamily: "var(--font-display)", color: "var(--color-papel)"}}>
                Tablón de mascotas
            </h2>

            <MascotasForm onAdd={onAdd} />

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2">
            {
                lista.map(m =>
                (
                    <div className="col" key={m.id}>
                        <div className="volante">
                            <div className={`volante-estado sello-${colorPorEstado[m.estado] ?? "secondary"}`}>
                                {m.estado ? obtenerLabelEstado(m.estado) : "sin estado"}
                            </div>

                            <h3>{m.nombre}</h3>

                            <div className="d-flex align-items-center gap-3 mb-3">
                                <img src={m.imagen} className="volante-imagen" style={{width: "45%" }}  alt={m.nombre}/>
                                <div className="etiqueta-cuerpo">
                                    <p className="mb-1">{m.descripcion}</p>
                                    <p className="mb-1">Edad: {m.edad}</p>
                                    <p className="mb-0">Raza: {m.raza}</p>
                                </div>
                            </div>

                            <label className="etiqueta-cuerpo d-block mb-3">
                                Cambiar estado:
                                <select 
                                    className="form-select form-select-sm mt-1"
                                    value={m.estado} 
                                    onChange={(e) => onUpdateEstado(m.id, e.target.value)}
                                >
                                    {
                                        estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                                    }
                                </select>
                            </label>

                            <div className="d-flex justify-content-between">
                                <Link to={`${m.id}`} className="btn btn-outline-dark btn-sm">Ver mascota</Link>
                                <button onClick={() => onDelete(m.id)} className="btn btn-outline-danger btn-sm">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
           </div>
        </div>
    )
}

export default MascotasList;