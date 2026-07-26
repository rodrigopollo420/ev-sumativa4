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

    const [errorEdicionMascota, setErrorEdicionMascota] = useState(null); 

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

    const buscarLabel = (lista, valor) => {
        const encontrado = lista.find((item) => item.value === valor);
        return encontrado ? encontrado.label :valor;
    }

    const guardarEdicionMascota = async () => {
        try {
            await mascotasApi.patch(`mascotas/${id}/`, {
                nombre: nombreEdit,
                descripcion: descripcionEdit,
                edad: edadEdit ==="" ? null: edadEdit,
                raza: razaEdit,
                tipo_animal: tipoAnimalEdit,
                sexo: sexoEdit,
                tamano: tamanoEdit,
                estado: estadoEdit,

            });
            setEditandoMascota(false);
            setErrorEdicionMascota(null);
        } catch (error) {
            setErrorEdicionMascota(obtenerMensajeError(error));
        } finally {
            fetchMascotaDetail();
        }
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
                    <img src={mascota?.imagen} alt={mascota?.nombre} />

                    {errorEdicionMascota && <p>{errorEdicionMascota}</p>}

                    {editandoMascota ? (
                        <>
                            <label>Nombre:
                                <input type="text" value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)} />
                            </label>
                            <label>Descripcion:
                                <textarea value={descripcionEdit} onChange={(e) => setDescripcionEdit(e.target.value)}></textarea>
                            </label>
                            <label>Edad:
                                <input type="number" value={edadEdit} onChange={(e) => setEdadEdit(e.target.value)} />
                            </label>
                            <label>Raza:
                                <input type="text" value={razaEdit} onChange={(e) => setRazaEdit(e.target.value)}/>
                            </label>
                            <label>Tipo de animal:
                                <select value={tipoAnimalEdit} onChange={(e) => setTipoAnimalEdit(e.target.value)}>
                                    {tipoMascota.map((t) => <option value={t.value} key={t.value}>{t.label}</option>)}
                                </select>
                            </label>
                            <label>Sexo:
                                <select value={sexoEdit} onChange={(e) => setSexoEdit(e.target.value)}>
                                    {sexo.map((s) => <option value={s.value} key={s.value}>{s.label}</option> )}
                                </select>
                            </label>
                            <label>Tamaño:
                                <select value={tamanoEdit} onChange={(e) => setTamanoEdit(e.target.value)}>
                                    {tamano.map((t) => <option value={t.value} key={t.value}>{t.label}</option>)}
                                </select>
                            </label>
                            <label>Estado:
                                <select value={estadoEdit} onChange={(e) => setEstadoEdit(e.target.value)}>
                                    {estados.map((e) => <option value={e.value} key={e.value}>{e.label}</option>)}
                                </select>
                            </label>

                            <button onClick={guardarEdicionMascota}>Guardar</button>
                            <button onClick={cancelarEdicionMascota}>Cancelar</button>

                        </>

                    ) : (
                        <>
                            <h2>{mascota?.nombre}</h2>
                            <p>{mascota?.descripcion}</p>
                            <p>Edad: {mascota?.edad}</p>
                            <p>Raza: {mascota?.raza}</p>
                            <p>Tipo De Animal: {buscarLabel(tipoMascota, mascota?.tipo_animal)}</p>
                            <p>Sexo: {buscarLabel(sexo, mascota?.sexo)}</p>
                            <p>Tamaño: {buscarLabel(tamano, mascota?.tamano)}</p>
                            <p>Estado: {buscarLabel(estados, mascota?.estado)}</p>

                            <button onClick={empezarEdicionMascota}>Editar Mascota</button>
                        </>
                    )}
                   
                    
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