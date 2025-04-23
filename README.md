![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-cloudbrowser

Este es un nodo para [n8n](https://n8n.io/) que permite a los usuarios interactuar con sitios web utilizando una instancia de navegador basada en la nube impulsada por Puppeteer. Proporciona varias operaciones para navegar por sitios web y recuperar diferentes tipos de contenido.

## Instalación

Sigue estos pasos para instalar este nodo:

```bash
# Instalar vía npm
npm install n8n-nodes-cloudbrowser

# O directamente desde n8n
n8n community-nodes add n8n-nodes-cloudbrowser
```

## Características

El nodo CloudBrowser ofrece las siguientes operaciones:

### 1. Obtener HTML del sitio web

Esta operación permite navegar a una URL específica y recuperar el contenido HTML de la página.

**Salida:**
- Título de la página
- URL final (después de cualquier redirección)
- Contenido HTML completo

### 2. Obtener captura de pantalla del sitio web

Esta operación permite navegar a una URL específica y capturar una imagen de la página.

**Opciones:**
- Página completa o solo la vista
- Calidad de imagen (para JPEG)
- Formato de imagen (JPEG o PNG)
- Área de recorte (coordenadas y dimensiones)

**Salida:**
- Captura de pantalla en base64
- Datos binarios
- Metadatos del archivo (nombre, extensión, tipo MIME)

### 3. Obtener PDF del sitio web

Esta operación permite navegar a una URL específica y generar una versión PDF de la página.

**Opciones:**
- Formato de papel (A4, Letter, etc.)
- Orientación (vertical/horizontal)
- Impresión de fondo
- Escala
- Márgenes
- Rangos de páginas

**Salida:**
- PDF en base64
- Datos binarios
- Metadatos del archivo (nombre, extensión, tipo MIME)

## Configuración

Todas las operaciones requieren los siguientes parámetros comunes:

- **Credenciales CloudBrowser API:** Tus credenciales de CloudBrowser API para autenticación
- **URL para navegar:** La URL del sitio web a visitar
- **Opciones de navegación:**
  - Esperar hasta evento (load, domcontentloaded, networkidle)
  - Timeout

Opciones adicionales de configuración del navegador incluyen:
- Tipo de navegador (Chrome, Chromium)
- Modo headless
- Modo stealth
- Gestión de sesiones
- Configuración de proxy

## Ejemplo de uso

### Capturar una captura de pantalla de un sitio web y guardarla como archivo

1. Añade el nodo CloudBrowser
2. Configura las credenciales de CloudBrowser API
3. Selecciona la operación "Obtener captura de pantalla del sitio web"
4. Especifica la URL (por ejemplo, https://n8n.io)
5. Configura las opciones de captura según sea necesario
6. Conecta a un nodo Write Binary File para guardar la imagen

### Generar un PDF de un sitio web

1. Añade el nodo CloudBrowser
2. Configura las credenciales de CloudBrowser API
3. Selecciona la operación "Obtener PDF del sitio web"
4. Especifica la URL (por ejemplo, https://docs.n8n.io)
5. Configura las opciones de PDF según sea necesario
6. Conecta a un nodo Write Binary File para guardar el PDF

## Requisitos de API

Este nodo requiere un token de API del servicio CloudBrowser.ai. Por favor, regístrate en https://cloudbrowser.ai para obtener tu token de API y configurarlo en la sección de credenciales.

## Licencia

[MIT](LICENSE.md)
