import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";

function MascotasForm({ onAdd }) {
    const [estados, setEstados] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);
    const [sexo, setSexo] = useState([]);
    const [tamano, setTamano] = useState([]);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [edad, setEdad] = useState("");
    const [raza, setRaza] = useState("");
    const [selectedEstado, setEstado] = useState("");
    const [selectedTipoMascota, setTipoMascotaSeleccionada] = useState("");
    const [selectedSexo, setSexoSeleccionado] = useState("");
    const [selectedTamano, setTamanoSeleccionado] = useState("");
    const [imagen, setImagen] = useState(null);

    const fetchChoices = async () => {
        try {
            const response = await mascotasApi.get("choices/");
            setEstados(response.data.estado);
            setTipoMascota(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);
        } catch {
            // Error silencioso de ESLint (no bloquea el formulario)
        }
    }

    useEffect(() => {
        fetchChoices();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("edad", edad);
        formData.append("raza", raza);
        formData.append("estado", selectedEstado);
        formData.append("tipo_animal", selectedTipoMascota);
        formData.append("sexo", selectedSexo);
        formData.append("tamano", selectedTamano);
        formData.append("imagen", imagen);

        onAdd(formData);
    }

    return (
        <div className="formulario-registro">
            <h3>Formulario de Registro</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label>Nombre:
                            <input className="form-control" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </label>
                    </div>           
                    <div className="col-md-6">
                        <label>Raza:
                            <input className="form-control" type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
                        </label>
                    </div>

                    <div className="col-12">
                        <label>Descripción:
                            <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        </label>
                    </div>
                    
                    <div className="col-md-3">
                        <label>Edad:
                            <input className="form-control" type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label>Estado:
                            <select className="form-select" value={selectedEstado} onChange={(e) => setEstado(e.target.value)}>
                                <option value={""} >Sin estado</option>
                                {
                                    estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                                }
                            </select>
                        </label>
                    </div>                
                    <div className="col-md-3">
                        <label>Tipo Animal:
                            <select className="form-select" value={selectedTipoMascota} onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}>
                                <option value={""} >Sin tipo</option>
                                {
                                    tipoMascota.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                                }
                            </select>
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label>Sexo:
                            <select className="form-select" value={selectedSexo} onChange={(e) => setSexoSeleccionado(e.target.value)}>
                                <option value={""} >Sin sexo</option>
                                {
                                    sexo.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                                }
                            </select>
                        </label>
                    </div>
                    
                    <div className="col-md-4">
                        <label>Tamaño:
                            <select className="form-select" value={selectedTamano} onChange={(e) => setTamanoSeleccionado(e.target.value)}>
                                <option value={""} >Sin tamaño</option>
                                {
                                    tamano.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                                }
                            </select>
                        </label>
                    </div>
                    <div className="col-md-8">
                        <label>Imagen:
                            <input className="form-control" type="file" onChange={(e) => setImagen(e.target.files[0])} />
                        </label>
                    </div>                
                </div>

                <div className="text-end mt-3">
                    <button type="submit" className="btn btn-registrar">Registrar</button>
                </div>  
            </form>
        </div>
    )
}

export default MascotasForm;