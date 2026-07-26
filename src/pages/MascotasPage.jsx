import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Outlet } from "react-router-dom";
import { obtenerMensajeError } from "../utilidades/manejoErrores";
import CarruselTarjetas from "../components/CarruselTarjetas";

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

    const perdidas = mascotasList.filter(m => m.estado === "perdida").length;
    const encontradas = mascotasList.filter(m => m.estado === "encontrada").length;
    const adoptadas = mascotasList.filter(m => m.estado === "adoptada").length;

    return (
        <>
            <div className="hero-mascotas">
                <h1>Página Mascotas</h1>
                <CarruselTarjetas />
            </div>

            <h2 className="text-center" style={{ fontFamily: "var(--font-display)", color: "var(--color-papel)"}}>
                Actualmente en el sitio, hay registradas...
            </h2>
            <div className="stats-circulos">
                <div className="circulo-stat circulo-perdidas">
                    <span className="circulo-numero">{perdidas}</span>
                    <span className="circulo-label">mascotas que se alejaron y están perdidas</span>
                </div>
                <div className="circulo-stat circulo-encontradas">
                    <span className="circulo-numero">{encontradas}</span>
                    <span className="circulo-label">mascotas encontradas que regresaron a su hogar</span>
                </div>
                <div className="circulo-stat circulo-adoptadas">
                    <span className="circulo-numero">{adoptadas}</span>
                    <span className="circulo-label">criaturitas que encontraron un nuevo hogar</span>
                </div>
            </div>

            {error && <p style={{color: "red"}}>{error}</p>}

            <MascotasList lista={mascotasList} onAdd={addMascotas} onDelete={deleteMascota} onUpdateEstado={updateEstadoMascota}/>

            <Outlet />
        </>
    )
}

export default MascotasPage;