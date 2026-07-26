import { useState } from "react";

const tarjetas = [
    {
        titulo: "Mascotas Perdidas",
        texto: "Nuestra misión es conectar a las mascotas perdidas o en busca de hogar con las personas que pueden ayudarlas, creando un lugar virtual de encuentro simple entre aquellos que buscan y aquellos que quieren dar una nueva oportunidad",
        icono: "d",
    },
    {
        titulo: "Registra una Mascota",
        texto: "¿Encontraste una mascota perdida o tienes una en adopción? Completa con sus datos en el formulario para que quede publicada en el tablón.",
        icono: "d",
        enlace: "#formulario-registro",
        enlaceTexto: "Ir al registro",
    },
    {
        titulo: "Explora el Tablón",
        texto: "Explora y revisa las mascotas publicadas, filtra por sus estados y actualiza su situación si es necesario.",
        icono: "d",
        enlace: "#tablon-mascotas",
        enlaceTexto: "Ir al tablón",
    },
    {
        titulo: "Deja un Comentario",
        texto: "Entra en los detalles de las mascotas para dar información de contacto, útil o palabras de ánimo.",
        icono: "",
    },
];

function CarruselTarjetas() {
    const [indice, setIndice] = useState(0);

    const anterior = () => {
        setIndice((prev) => (prev === 0 ? tarjetas.length - 1 : prev - 1));
    }

    const siguiente = () => {
        setIndice((prev) => (prev === tarjetas.length - 1 ? 0 : prev + 1));
    }

    const actual = tarjetas[indice];

    return (
        <div className="carrusel-hero">
            <button className="carrusel-flecha" onClick={anterior} aria-label="Tarjeta anterior">
                &#10094;
            </button>

            <div className="carrusel-tarjeta">
                <div className="carrusel-texto">
                    <h3>{actual.titulo}</h3>
                    <p>{actual.texto}</p>
                    {actual.enlace && (
                        <a href={actual.enlace} className="carrusel-enlace">{actual.enlaceTexto}</a>
                    )}
                </div>
                <div className="carrusel-imagen">
                    <span>{actual.icono}</span>
                </div>
            </div>

            <button className="carrusel-flecha" onClick={siguiente} aria-label="Tarjeta siguiente">
                &#10095;
            </button>

            <div className="carrusel-puntos">
                {tarjetas.map((_, i) => (
                    <button
                        key={i}
                        className={`carrusel-punto ${i === indice ? "activo" : ""}`}
                        onClick={() => setIndice(i)}
                        aria-label={`Ir a tarjeta ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default CarruselTarjetas;