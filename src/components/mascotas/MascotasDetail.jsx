import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";
import ComentariosList from "../comentarios/ComentariosList";
import ComentariosForm from "../comentarios/ComentariosForm";
import { obtenerMensajeError } from "../../utilidades/manejoErrores";

function MascotasDetail() {
    const { id } = useParams();
    const [fetchError, setFetchError] = useState(null);
    const [mascota, setMascota] = useState(null);
    const [errorComentario, setErrorComentario] = useState(null);

    const [estados, setEstados] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);
    const [sexo, setSexo] = useState([])
    const [tamano,setTamano] = useState([]);

    const [editandoMascota, setEditandoMascota] = useState(false);
    const [nombreEdit, setNombreEdit] = useState("");
    const [descripcionEdit, setDescripcionEdit] = useState("");
    const [edadEdit, setEdadEdit] = useState("");
    const [razaEdit, setRazaEdit] = useState("");
    const [tipoAnimalEdit, setTipoAnimalEdit] = useState("");
    const [sexoEdit, setSexoEdit] = useState("")
    const [tamanoEdit, setTamanoEdit] = useState("");
    const [estadoEdit, setEstadoEdit] =useState("");

    const fetchMascotaDetail = async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            setMascota(response.data);
            setFetchError(null);
        } catch (error) {
            setFetchError(obtenerMensajeError(error));
        }
    }

    const fetchChoices = async () => {
        try {
            const response = await mascotasApi.get("choices/");
            setEstados(response.data.estado);
            setTipoMascota(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);
        } catch (error) {
            console.log(error);
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

    const editarComentario = async (comentarioId, nuevoContenido) => {
        try {
            await mascotasApi.patch(`comentarios/${comentarioId}/`, { contenido: nuevoContenido});
            setErrorComentario(null);
        } catch (error) {
            setErrorComentario(obtenerMensajeError(error));
        } finally {
            fetchMascotaDetail();
        }
    }

    const empezarEdicionMascota = () => {
        setNombreEdit(mascota?.nombre ?? "");
        setDescripcionEdit(mascota?.descripcion ?? "");
        setEdadEdit(mascota?.edad ?? "");
        setRazaEdit(mascota?.raza ?? "");
        setTipoAnimalEdit(mascota?.tipo_animal ?? "");
        setSexoEdit(mascota?.sexo ?? "");
        setTamanoEdit(mascota?.tamano ?? "");
        setEstadoEdit(mascota?.estado ?? "");
        setEditandoMascota(true);
    }

    const cancelarEdicionMascota = () => {
        setEditandoMascota(false)
    }

    useEffect(() => {
        fetchMascotaDetail();
        fetchChoices();
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
                    <p>Tipo De Animal: {mascota?.tipo_animal}</p>
                    <p>Sexo: {mascota?.sexo}</p>
                    <p>Tamaño: {mascota?.tamano}</p>
                    <p>Estado: {mascota?.estado}</p>

                    <button onClick={empezarEdicionMascota}>Editar Mascota</button>

                    <h3>Comentarios</h3>
                    {errorComentario && <p>{errorComentario}</p>}
                    <ComentariosList
                        comentarios={mascota?.comentarios ?? []}
                        onEliminar={eliminarComentario}
                        onEditar={editarComentario}
                    />
                    <ComentariosForm onAdd={agregarComentario} />
                </>
            )}
        </div>
    )
}

export default MascotasDetail;