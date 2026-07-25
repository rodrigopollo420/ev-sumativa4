import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Outlet } from "react-router-dom";
import { obtenerMensajeError } from "../utilidades/manejoErrores";

function MascotasPage() {
    const [mascotasList, setMascotasList] = useState([]);
    const [error, setError] = useState(null);

    const fetchMascotas = async () => {
        try {
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
        } catch (error) {
            setError(obtenerMensajeError(error));
        }
    }

    const addMascotas = async (mascota) => {
        try {
            const response = await mascotasApi.post('mascotas/', mascota);
            console.log(response);
            setError(null);
        } catch (error) {
            setError(obtenerMensajeError(error));
        } finally {
            fetchMascotas();
        }
    }

    const deleteMascota = async (id) => {
        try {
            const response = await mascotasApi.delete(`mascotas/${id}/`);
            console.log(response);
            setError(null);
        } catch (error) {
            setError(obtenerMensajeError(error));
        } finally {
            fetchMascotas();
        }

    }

    useEffect(() => {
        fetchMascotas();
    }, [])

    return (
        <>
            <h1>Pagina Mascotas</h1>

            {error && <p style={{color: "red"}}>{error}</p>}

            <MascotasList lista={mascotasList} onAdd={addMascotas} onDelete={deleteMascota} />

            <Outlet />
        </>
    )
}

export default MascotasPage;