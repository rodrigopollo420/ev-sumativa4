import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";
import ComentariosList from "../comentarios/ComentariosList";
import ComentariosForm from "../comentarios/ComentariosForm";
import { obtenerMensajeError } from "../../utilidades/manejoErrores";

function MascotasDetail() {
    const { id } = useParams();
    console.log(id);
    const [fetchError, setFetchError] = useState(null);
    const [mascota, setMascota] = useState(null);
    const [errorComentario, setErrorComentario] = useState(null);

    const fetchMascotaDetail = async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            setMascota(response.data);
            setFetchError(null);
        } catch (error) {
            setFetchError(obtenerMensajeError(error));
        }
    }

    const agregarComentario = async ({ autor, contenido }) => {
        try {
            await mascotasApi.post(`mascotas/${id}/comentar/`, { autor, contenido });
            setErrorComentario(null);
        } catch (error) {
            setErrorComentario(obtenerMensajeError(error));
        } finally {
            fetchMascotaDetail();
        }
    }

    const eliminarComentario = async (comentarioId) => {
        try {
            await mascotasApi.delete(`comentarios/${comentarioId}/`);
            setErrorComentario(null)
        } catch (error) {
            setErrorComentario(obtenerMensajeError(error));
        } finally {
            fetchMascotaDetail();
        }
    }

    useEffect(() => {
        fetchMascotaDetail();
    }, []);

    return (
        <div>
            {fetchError ? (
                <p>{fetchError}</p>
            ) : (
                <>
                    <h2>{mascota?.nombre}</h2>
                    <img src={mascota?.imagen} alt={mascota?.nombre} />
                    <p>{mascota?.descripcion}</p>
                    <p>Edad: {mascota?.edad}</p>
                    <p>Raza: {mascota?.raza}</p>

                    <h3>Comentarios</h3>
                    {errorComentario && <p>{errorComentario}</p>}
                    <ComentariosList
                        comentarios={mascota?.comentarios ?? []}
                        onEliminar={eliminarComentario}
                    />
                    <ComentariosForm onAdd={agregarComentario} />
                </>
            )}
        </div>
    )
}

export default MascotasDetail;