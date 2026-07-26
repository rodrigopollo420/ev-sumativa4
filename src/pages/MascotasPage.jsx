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
            setMascotasList(response.data);
        } catch (error) {
            setError(obtenerMensajeError(error));
        }
    }

    const addMascotas = async (mascota) => {
        try {
            await mascotasApi.post('mascotas/', mascota);
            setError(null);
        } catch (error) {
            setError(obtenerMensajeError(error));
        } finally {
            fetchMascotas();
        }
    }

    const deleteMascota = async (id) => {
        try {
            await mascotasApi.delete(`mascotas/${id}/`);
            setError(null);
        } catch (error) {
            setError(obtenerMensajeError(error));
        } finally {
            fetchMascotas();
        }

    }

    const updateEstadoMascota = async (id, nuevoEstado) => {
        try {
            await mascotasApi.patch(`mascotas/${id}/`, {estado: nuevoEstado});
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
            {error && <p style={{color: "red"}}>{error}</p>}

            <MascotasList lista={mascotasList} onAdd={addMascotas} onDelete={deleteMascota} onUpdateEstado={updateEstadoMascota}/>

            <Outlet />
        </>
    )
}

export default MascotasPage;