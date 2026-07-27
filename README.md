# MascotasApp - Front End

Aplicación Front-End en React que consume la API REST de MascotasApp, permitiendo listar, crear, editar y eliminar mascotas, además de comentar sobre ellas.

## Instalación y ejecución

```bash
npm install
npm run dev
```

El proyecto corre en modo desarrollo con Vite, y se conecta directamente a la API pública `https://vrodriguezvc.pythonanywhere.com/api/`.

## Funcionalidades principales

- Listado de mascotas y detalle individual con sus comentarios.
- Creación de mascotas con imagen (usando `FormData`).
- Edición de datos de una mascota (nombre, descripción, edad, raza, tipo, sexo, tamaño, estado).
- Eliminación de mascotas.
- Búsqueda por nombre y filtros combinables por estado, tipo de animal, sexo y tamaño.
- Comentarios: agregar, editar y eliminar.
- Manejo de errores centralizado, mostrando mensajes claros según el código de respuesta de la API.
- Interfaz con Bootstrap y un tema visual propio.

## Ejemplos de código

**Envío de una mascota nueva con imagen, usando `FormData`:**

```jsx
const formData = new FormData();
formData.append("nombre", nombre);
formData.append("descripcion", descripcion);
formData.append("imagen", imagen);
await mascotasApi.post("mascotas/", formData);
```

**Actualización parcial del estado de una mascota con `PATCH`:**

```jsx
await mascotasApi.patch(`mascotas/${id}/`, { estado: 'adoptada' });
```

**Manejo de errores centralizado:**

```jsx
try {
    await mascotasApi.delete(`comentarios/${comentarioId}/`);
    setErrorComentario(null);
} catch (error) {
    setErrorComentario(obtenerMensajeError(error));
} finally {
    fetchMascotaDetail();
}
```

**Búsqueda por nombre, normalizando mayúsculas y espacios:**

```jsx
const normalizar = (texto) => texto.trim().toLowerCase();

const listaFiltrada = lista.filter(m => {
    const coincideNombre = normalizar(m.nombre ?? "").includes(normalizar(busqueda));
});
```

## Uso de herramientas de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizó la siguiente herramienta de Inteligencia Artificial como apoyo:

### Claude

Claude fue utilizado como herramienta de apoyo en distintas etapas del desarrollo del proyecto. Se empleó para resolver dudas relacionadas con React y el consumo de la API mediante Axios, especialmente en la implementación de las funcionalidades de comentarios (agregar, editar y eliminar) y en la actualización del estado de una mascota.

Además, brindó orientación en el diseño visual de la aplicación utilizando Bootstrap junto con una paleta de colores personalizada, incluyendo la implementación del carrusel de la página principal. También fue de utilidad para desarrollar un sistema de manejo de errores que mostrara mensajes comprensibles para el usuario en lugar de los errores originales entregados por la API, así como para revisar el código y detectar errores puntuales de sintaxis durante el desarrollo.

Más adelante, también ayudó a incorporar la barra de búsqueda por nombre y los filtros combinables por estado, tipo de animal, sexo y tamaño, cuidando que la búsqueda no distinguiera entre mayúsculas y minúsculas ni se viera afectada por espacios de más. De forma similar, colaboró en agregar un pie de página visible en todas las vistas de la aplicación, ajustando el layout con Flexbox para que se mantuviera fijo al final de la pantalla sin importar cuánto contenido tuviera cada página.

### Declaración

La herramienta de Inteligencia Artificial fue utilizada exclusivamente como apoyo durante el desarrollo de este proyecto. Su uso se limitó a la resolución de dudas técnicas, la revisión de código y la orientación en aspectos específicos de la implementación. El diseño de la solución, la integración de los componentes, la adaptación del código, las pruebas de funcionamiento y las decisiones finales de desarrollo fueron realizadas por el equipo.