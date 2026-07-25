

function ComentariosList({ comentarios,onEliminar }) {
    return (
        <div>
            {comentarios.length === 0 && <p>Sin comentarios por ahora</p>}

            {
                comentarios.map(c => (
                    <p key={c.id}>
                        <strong>{c.autor}:</strong> {c.contenido}
                        <button onClick={() => onEliminar(c.id)}>Eliminar</button>
                    </p>
                )
                )
            }

        </div>
    )
}

export default ComentariosList;