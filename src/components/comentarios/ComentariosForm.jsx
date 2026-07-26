import { useState } from "react";

function ComentariosForm({ onAdd }) {
    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ autor, contenido });
        setAutor("");
        setContenido("");
    }

    return (
        <form onSubmit={handleSubmit} className="formulario-registro mt-2">
            <label className="mb-2">Autor:
                <input type="text" className="form-control form-control-sm mt-1" value={autor} onChange={(e) => setAutor(e.target.value)} />
            </label>
            <label className="mb-2">Comentario:
                <textarea className="form-control form-control-sm mt-1" value={contenido} onChange={(e) => setContenido(e.target.value)}></textarea>
            </label>
            <button type="submit" className="btn-registrar btn btn-sm">Comentar</button>
        </form>
    )
}

export default ComentariosForm;