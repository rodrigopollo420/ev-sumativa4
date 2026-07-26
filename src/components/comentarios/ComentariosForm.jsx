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

    return(
        <form onSubmit={handleSubmit} className="p-3 rounded mt-2" style={{backgroundColor: "var(--color-borde)"}}>
            <label className="etiqueta-cuerpo d-block mb-2" style={{color: "var(--color-papel)"}}>Autor:
                <input type="text" className="form-control form-control-sm mt-1" value={autor} onChange={(e) => setAutor(e.target.value)}/>
            </label>
            <label className="etiqueta-cuerpo d-block mb-2" style={{color: "var(--color-papel)"}}>Comentario:
                <textarea className="form-control form-control-sm mt-1" value={contenido} onChange={(e) => setContenido(e.target.value)}></textarea>
            </label>
            <button type="submit" className="btn btn-sm" style={{ backgroundColor: "var(--color-sello)", color: "var(--color-papel)" }}>Comentar</button>

        </form>
    )
}

export default ComentariosForm;