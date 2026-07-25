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

    return (
        <div>
            {comentarios.length === 0 && <p>Sin comentarios por ahora</p>}

            {comentarios.map ((c) => (
                <p key={c.id}>
                    <strong>{c.autor}:</strong>{" "}
                    {editandoId === c.id ? (
                        <>
                        
                            <textarea 
                                value={textoEdicion}
                                onChange={(e) => setTextoEdicion(e.target.value)}
                            />
                            <button onClick={() => guardarEdicion(c.id) }>Guardar</button>
                            <button onClick={cancelarEdicion}>Cancelar</button>
                        </>
                    ) :(
                        <>
                        {c.contenido}
                        <button onClick={() => empezarEdicion(c)}>Editar</button>
                        <button onClick={() => onEliminar(c.id)}>Eliminar</button>
                        </>
                    )}
                </p>                
            ))}


        </div>
    );
}

export default ComentariosList;