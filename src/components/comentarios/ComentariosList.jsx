

function ComentariosList({ comentarios }) {
    return (
        <div>
            {comentarios.length === 0 && <p>Sin comentarios por ahora</p>}

            {
                comentarios.map(c => (
                    <p key={c.id}>
                        <strong>{c.autor}:</strong> {c.contenido}
                    </p>
                )
                )
            }

        </div>
    )
}

export default ComentariosList;