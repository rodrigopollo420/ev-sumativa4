const traducciones = {
    "This field may not be blank.": "Este campo no puede estar vacío.",
    "This field is required.": "Este campo es requerido.",
    "This field may not be null.": "Este campo no puede ser nulo.",
    "No file was submitted.": "No se envió ningún archivo.",
    "Enter a valid integer.": "Introduce un número entero válido.",
    "The submitted data was not a file. Check the encoding type on the form.": "No se envió un archivo válido. Selecciona una imagen antes de registrar.",

}

function traducirMensaje(mensaje) {
    return traducciones[mensaje] ?? mensaje;
}

export function obtenerMensajeError(error) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (!error.response) {
        return "Conexión con el servidor fallida";
    }

    if (status === 400) {
        if (data && typeof data === "object") {
            const primerCampo = Object.keys(data)[0];
            const primerMensaje = Array.isArray(data[primerCampo])
            ? data[primerCampo][0]
            : data[primerCampo];
            return `Error de validación: ${traducirMensaje(primerMensaje)}`;
        }
        return "Los datos enviados son inválidos.";
    }

    if (status == 404) {
        return "El recurso no existe.";
    }

    if (status == 405) {
        return "Acción no permitida.";
    }

    if (status == 415) {
        return "Formato de datos no compatible.";
    }

    return "Algo ha ocurrido... Por favor intenta de nuevo."
}