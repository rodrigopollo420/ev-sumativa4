import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MascotasForm from "./MascotasForm";
import mascotasApi from "../../api/api";

const colorPorEstado = {
    perdida: "danger",
    encontrada: "warning",
    en_adopcion: "info",
    adoptada: "success",
}

const normalizar = (texto) => texto.trim().toLowerCase();

function MascotasList({ lista, onAdd, onDelete, onUpdateEstado }) {
    const [estados, setEstados] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);
    const [sexo, setSexo] = useState([]);
    const [tamano, setTamano] = useState([]);

    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroSexo, setFiltroSexo] = useState("");
    const [filtroTamano, setFiltroTamano] = useState("");

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

    const obtenerLabelEstado = (valor) => {
        const encontrado = estados.find(e => e.value === valor);
        return encontrado ? encontrado.label : valor;
    }

    useEffect(() => {
        fetchChoices();
    }, [])

    const listaFiltrada = lista.filter(m => {
        const coincideNombre = normalizar(m.nombre ?? "").includes(normalizar(busqueda));
        const coincideEstado = filtroEstado === "" || m.estado === filtroEstado;
        const coincideTipo = filtroTipo === "" || m.tipo_animal === filtroTipo;
        const coincideSexo = filtroSexo === "" || m.sexo === filtroSexo;
        const coincideTamano = filtroTamano === "" || m.tamano === filtroTamano;
        return coincideNombre && coincideEstado && coincideTipo && coincideSexo && coincideTamano;
    });

    return (
        <div id="formulario-registro" className="container py-4">
            <MascotasForm onAdd={onAdd} />
            
            <div id="tablon-mascotas">
                <h2 className="text-center mb-4" style={{fontFamily: "var(--font-display)", color: "var(--color-papel)"}}>
                    Tablón de mascotas
                </h2>

                <div className="barra-filtros">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label>Buscar por nombre
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm mt-1"
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    placeholder="Ej: Firulais"
                                />
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label>Estado
                                <select className="form-select form-select-sm mt-1" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                                    <option value="">Todos</option>
                                    {estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)}
                                </select>
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label>Tipo de animal
                                <select className="form-select form-select-sm mt-1" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                                    <option value="">Todos</option>
                                    {tipoMascota.map(t => <option value={t.value} key={t.value}>{t.label}</option>)}
                                </select>
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label>Sexo
                                <select className="form-select form-select-sm mt-1" value={filtroSexo} onChange={(e) => setFiltroSexo(e.target.value)}>
                                    <option value="">Todos</option>
                                    {sexo.map(s => <option value={s.value} key={s.value}>{s.label}</option>)}
                                </select>
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label>Tamaño
                                <select className="form-select form-select-sm mt-1" value={filtroTamano} onChange={(e) => setFiltroTamano(e.target.value)}>
                                    <option value="">Todos</option>
                                    {tamano.map(t => <option value={t.value} key={t.value}>{t.label}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                </div>

                {listaFiltrada.length === 0 && (
                    <p className="text-center etiqueta-cuerpo" style={{ color: "var(--color-papel)"}}>
                        No se encontraron mascotas con esos filtros.
                    </p>
                )}

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2">
                {
                    listaFiltrada.map(m =>
                    (
                        <div className="col" key={m.id}>
                            <div className="volante">
                                <div className={`volante-estado sello-${colorPorEstado[m.estado] ?? "secondary"}`}>
                                    {m.estado ? obtenerLabelEstado(m.estado) : "sin estado"}
                                </div>

                                <h3>{m.nombre}</h3>

                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <img src={m.imagen} className="volante-imagen" style={{width: "45%" }}  alt={m.nombre}/>
                                    <div className="etiqueta-cuerpo">
                                        <p className="mb-1">{m.descripcion}</p>
                                        <p className="mb-1">Edad: {m.edad}</p>
                                        <p className="mb-0">Raza: {m.raza}</p>
                                    </div>
                                </div>

                                <label className="etiqueta-cuerpo d-block mb-3">
                                    Cambiar estado:
                                    <select 
                                        className="form-select form-select-sm mt-1"
                                        value={m.estado} 
                                        onChange={(e) => onUpdateEstado(m.id, e.target.value)}
                                    >
                                        {
                                            estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                                        }
                                    </select>
                                </label>

                                <div className="d-flex justify-content-between">
                                    <Link to={`${m.id}`} className="btn btn-outline-dark btn-sm">Ver mascota</Link>
                                    <button onClick={() => onDelete(m.id)} className="btn btn-outline-danger btn-sm">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default MascotasList;