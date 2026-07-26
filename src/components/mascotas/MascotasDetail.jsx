import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState, useCallback } from "react";
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
    const [tamano, setTamano] = useState([]);

    const [editandoMascota, setEditandoMascota] = useState(false);
    const [nombreEdit, setNombreEdit] = useState("");
    const [descripcionEdit, setDescripcionEdit] = useState("");
    const [edadEdit, setEdadEdit] = useState("");
    const [razaEdit, setRazaEdit] = useState("");
    const [tipoAnimalEdit, setTipoAnimalEdit] = useState("");
    const [sexoEdit, setSexoEdit] = useState("")
    const [tamanoEdit, setTamanoEdit] = useState("");
    const [estadoEdit, setEstadoEdit] = useState("");

    const [errorEdicionMascota, setErrorEdicionMascota] = useState(null);

    const fetchMascotaDetail = useCallback(async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            setMascota(response.data);
            setFetchError(null);
        } catch (error) {
            setFetchError(obtenerMensajeError(error));
        }
    }, [id]);

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
            await mascotasApi.patch(`comentarios/${comentarioId}/`, { contenido: nuevoContenido });
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
        return encontrado ? encontrado.label : valor;
    }

    const claseSello = (estadoValor) => {
    const mapa = {
        perdida: "sello-danger",
        encontrada: "sello-info",
        en_adopcion: "sello-warning",
        adoptada: "sello-success",
    };
    return mapa[estadoValor] ?? "sello-secondary";
}

    const guardarEdicionMascota = async () => {

        if (edadEdit === "" || razaEdit === "") {
            setErrorEdicionMascota("Edad o raza no pueden estar vacias");
            return;
        }

        try {
            await mascotasApi.patch(`mascotas/${id}/`, {
                nombre: nombreEdit,
                descripcion: descripcionEdit,
                edad: edadEdit,
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
    }, [fetchMascotaDetail]);

    return (
        <div>
            {fetchError ? (
                <p className="etiqueta-cuerpo">{fetchError}</p>
            ) : (
                <div className="row g-4 align-items-start">
                    <div className="col-lg-4">
                        <div className="volante h-100">
                            <h3 className="text-center">Comentarios</h3>
                            {errorComentario && <p className="etiqueta-cuerpo text-center">{errorComentario}</p>}
                            <ComentariosList
                                comentarios={mascota?.comentarios ?? []}
                                onEliminar={eliminarComentario}
                                onEditar={editarComentario}
                            />
                            <ComentariosForm onAdd={agregarComentario} />
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="volante h-100 text-center">
                            {editandoMascota ? (
                                <input
                                    type="text"
                                    className="form-control text-center mb-3"
                                    value={nombreEdit}
                                    onChange={(e) => setNombreEdit(e.target.value)}
                                />
                            ) : (
                                <h2>{mascota?.nombre}</h2>
                            )}

                            <img
                                src={mascota?.imagen}
                                alt={mascota?.nombre}
                                className="img-fluid rounded mb-3"
                            />

                            {editandoMascota ? (
                                <textarea
                                    className="form-control"
                                    value={descripcionEdit}
                                    onChange={(e) => setDescripcionEdit(e.target.value)}
                                />
                            ) : (
                                <p className="etiqueta-cuerpo">{mascota?.descripcion}</p>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="volante h-100">
                            <h3 className="text-center">Detalles</h3>
                            {errorEdicionMascota && <p className="etiqueta-cuerpo text-center">{errorEdicionMascota}</p>}

                            {editandoMascota ? (
                                <>
                                    <label className="etiqueta-cuerpo d-block mb-2">Edad:
                                        <input type="number" className="form-control form-control-sm mt-1" value={edadEdit} onChange={(e) => setEdadEdit(e.target.value)} />
                                    </label>
                                    <label className="etiqueta-cuerpo d-block mb-2">Raza:
                                        <input type="text" className="form-control form-control-sm mt-1" value={razaEdit} onChange={(e) => setRazaEdit(e.target.value)} />
                                    </label>
                                    <label className="etiqueta-cuerpo d-block mb-2">Tipo de animal:
                                        <select className="form-select form-select-sm mt-1" value={tipoAnimalEdit} onChange={(e) => setTipoAnimalEdit(e.target.value)}>
                                            {tipoMascota.map((t) => <option value={t.value} key={t.value}>{t.label}</option>)}
                                        </select>
                                    </label>
                                    <label className="etiqueta-cuerpo d-block mb-2">Sexo:
                                        <select className="form-select form-select-sm mt-1" value={sexoEdit} onChange={(e) => setSexoEdit(e.target.value)}>
                                            {sexo.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
                                        </select>
                                    </label>
                                    <label className="etiqueta-cuerpo d-block mb-2">Tamaño:
                                        <select className="form-select form-select-sm mt-1" value={tamanoEdit} onChange={(e) => setTamanoEdit(e.target.value)}>
                                            {tamano.map((t) => <option value={t.value} key={t.value}>{t.label}</option>)}
                                        </select>
                                    </label>
                                    <label className="etiqueta-cuerpo d-block mb-3">Estado:
                                        <select className="form-select form-select-sm mt-1" value={estadoEdit} onChange={(e) => setEstadoEdit(e.target.value)}>
                                            {estados.map((e) => <option value={e.value} key={e.value}>{e.label}</option>)}
                                        </select>
                                    </label>

                                    <div className="d-flex gap-2">
                                        <button className="btn-registrar btn btn-sm" onClick={guardarEdicionMascota}>Guardar</button>
                                        <button className="btn btn-outline-secondary btn-sm" onClick={cancelarEdicionMascota}>Cancelar</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="etiqueta-cuerpo mb-2">Edad: {mascota?.edad}</p>
                                    <p className="etiqueta-cuerpo mb-2">Raza: {mascota?.raza}</p>
                                    <p className="etiqueta-cuerpo mb-2">Tipo De Animal: {buscarLabel(tipoMascota, mascota?.tipo_animal)}</p>
                                    <p className="etiqueta-cuerpo mb-2">Sexo: {buscarLabel(sexo, mascota?.sexo)}</p>
                                    <p className="etiqueta-cuerpo mb-2">Tamaño: {buscarLabel(tamano, mascota?.tamano)}</p>
                                    <p className="etiqueta-cuerpo mb-3">
                                        Estado: <span className={`sello ${claseSello(mascota?.estado)}`}>{buscarLabel(estados, mascota?.estado)}</span>
                                    </p>

                                    <button className="btn-registrar btn btn-sm" onClick={empezarEdicionMascota}>Editar Mascota</button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default MascotasDetail;