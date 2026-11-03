# amorcito — versión final

## Vista previa
Abre `index.html` en un navegador (Safari, Chrome, iPhone o PC). Necesita conexión a internet: las cinco fotos se cargan desde el repositorio público de GitHub (igual que en el proyecto original) y las letras desde Google Fonts.

## Publicar (GitHub Pages)
Sube el **contenido** de esta carpeta (`index.html`, `css/`, `js/`, `assets/`) a la raíz del sitio. No hace falta compilar nada.

## Música (opcional)
No hay canción incluida. Para activarla guarda un archivo MP3 con el nombre exacto `cancion.mp3` en `assets/musica/`. Funciona en iPhone/Safari porque solo suena cuando se pulsa el botón «música» (nunca automáticamente).

## Fotos
Las fotos se leen desde `raw.githubusercontent.com/ordonezortizjuanesteban276-netizen/amorcito/main/...`; el repositorio debe seguir siendo público y los archivos conservar su nombre. Para usarlas desde esta carpeta, copia los cinco archivos a `assets/fotos/` y cambia las rutas de `PHOTOS` en `js/main.js` (por ejemplo `assets/fotos/IMG_0749_Original.png`) y el `src` del `<img id="galleryPhoto">` en `index.html`.

## Estructura
- `index.html`
- `css/style.css`
- `js/main.js`
- `assets/fotos/` (opcional: copias locales de las fotos)
- `assets/musica/` (opcional: `cancion.mp3`)
- `PROJECT_CONTEXT.md`
- `CHANGELOG.md`
