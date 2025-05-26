# App de Recetas

Esta es una aplicación web para agregar, listar y ver recetas de cocina. Fue desarrollada con React en el frontend y Flask en el backend.

---

## Tecnologías

- Frontend: React (creado con Create React App)
- Backend: Flask
- Comunicación: API REST
- Base de datos: Actualmente almacenamiento en memoria, pronto SQLite.

---

## Scripts disponibles (React)

En el directorio del frontend, puedes correr:

### `npm start`

Ejecuta la app en modo desarrollo.  
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.  

La página se recarga si haces cambios.

### `npm test`

Lanza el modo interactivo para pruebas.

### `npm run build`

Construye la app para producción en la carpeta `build`.

---

## Cómo correr el backend (Flask)

1. Crear y activar entorno virtual (recomendado):
```bash
python -m venv venv
# Windows PowerShell
.\venv\Scripts\activate
# Linux/macOS
source venv/bin/activate