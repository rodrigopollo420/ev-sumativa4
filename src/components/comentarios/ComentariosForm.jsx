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
        <form onSubmit={handleSubmit}>
            <label>Autor:
                <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
            </label>
            <label>Comentario:
                <textarea value={contenido} onChange={(e) => setContenido(e.target.value)}></textarea>
            </label>
            <button type="submit" >Comentar</button>

        </form>
    )
}

export default ComentariosForm;