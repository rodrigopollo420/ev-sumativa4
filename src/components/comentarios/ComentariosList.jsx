import { useState } from "react";

function ComentariosList({ comentarios,onEliminar, onEditar}) {

    const [editandoId, setEditandoId] = useState(null);
    const [textoEdicion, setTextoEdicion] = useState("");

    const empezarEdicion = (comentario) => {
        setEditandoId(comentario.id);
        setTextoEdicion(comentario.contenido);
    }

    const guardarEdicion = (id) => {
        onEditar(id, textoEdicion);
        setEditandoId(null);
    }

    const cancelarEdicion = () => {
        setEditandoId(null);
        setTextoEdicion("");    
    }

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString("es-CL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return (
        <div className="d-flex flex-column gap-2">
            {comentarios.length === 0 && (
                <p className="etiqueta-cuerpo mb-0">Sin comentarios por ahora</p>)}

            {comentarios.map((c) => (
                <div key={c.id} className="nota-comentario">
                    {editandoId === c.id ? (
                        <>
                            <textarea
                                className="form-control form-control-sm mb-2"
                                value={textoEdicion}
                                onChange={(e) => setTextoEdicion(e.target.value)}
                            />
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-dark btn-sm" onClick={() => guardarEdicion(c.id)}>Guardar</button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={cancelarEdicion}>Cancelar</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p className="mb-1 autor-comentario">{c.autor}</p>
                                <small className="etiqueta-cuerpo">
                                    {formatearFecha(c.fecha_creacion)}
                                </small>
                            </div>
                            <p className="etiqueta-cuerpo mb-2">{c.contenido}</p>
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-dark btn-sm" onClick={() => empezarEdicion(c)}>Editar</button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => onEliminar(c.id)}>Eliminar</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ComentariosList;