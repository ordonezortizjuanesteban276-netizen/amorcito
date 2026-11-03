# CHANGELOG

## 2026-11-03 — Textos nuevos y corrección de errores
### Contenido (respetando la escritura original, sin corregir palabras)
- Portada: nueva frase «Amorcito eres la persona mas importante q tengo en toda mi vida mua.»
- Portada: eliminado «abre esta pequeña sorpresa ♡».
- Carta: «para mí» → «para nosotros» (solo esa palabra).
- Recuerdos favoritos: nuevo texto «Amorcito quiero tener muchas fotos contigos jugando y cuando estemos en persona.»; se mantienen las mismas cinco fotos.
- Galería: eliminados todos los pies de foto (el marco tipo polaroid se conserva).
- Final: nuevo texto «gracias por ser tu, hacerme tan feliz y por todos los recuerdos que tenemos y q vamos a tener.»

### Segunda revisión (carta y fluidez)
- Carta: sobre cerrado limpio (sin texto visible) y solapa que al abrir queda siempre detrás del papel; solo transformaciones 2D (sin 3D ni cambios de z-index), compatible con Safari/iPhone.
- Rendimiento: menos blur en el cristal, partículas acotadas, `resize` solo si cambia el ancho, fundido suave al cambiar de foto y precarga con decodificación en segundo plano.

### Tercera revisión (iPhone 17)
- Carta: el papel ya no se sale del sobre al abrirse (la altura se mide sin tocar estilos, así Safari anima bien la transición).
- Fondo tierno: corazones suaves, corazoncitos, destellos, florecitas y burbujitas de luz que flotan/titilan detrás del contenido (solo `transform`/`opacity`). Con movimiento reducido se quedan quietos.
- Pruebas y ajustes pensados para iPhone 17 (402×874 @3x).
- Música: empieza siempre desde el principio, se repite al terminar y, si se sale del navegador, se quita y vuelve al inicio.

### Errores corregidos
- Carta (iPhone/Safari): la solapa se dibujaba encima del texto. Sobre rehecho sin 3D ni cambios de capa; cerrado queda limpio y abierto se lee completo.
- Fluidez: fondo en capa fija, animación de la carta solo con transform/clip-path, desenfoque más ligero, menos pétalos/corazones y medición solo si cambia el ancho.
- Carta abierta: el sobre tapaba la mayor parte del texto y el botón se superponía. Ahora la carta sale del sobre y se lee completa (se vuelve a medir al girar el móvil o cargar las fuentes).
- Barra superior: en iPhone el texto «hecho con amor, para ti» se pisaba con el botón de música.
- Los pétalos no tenían estilo (`.petals`): ahora están fijos a la pantalla y ya no pueden provocar desplazamiento lateral en Safari/iPhone.
- Nota «con todo mi cariño» tapaba la tarjeta en pantallas pequeñas.
- `<img src="">` vacío (HTML inválido) sustituido por la primera foto.
- Línea decorativa con estrella: desaparece el parche de color de fondo.
- Corazón de la portada con teclado/lector de pantalla: los corazones salían de la esquina superior izquierda.
- Música: estado del botón coherente al pausar/salir de la pestaña, pulsaciones rápidas sin falsos avisos y mensaje «añade canción» solo si falta el archivo (vuelve a «música» a los 3 s).
- Foto que no carga: se oculta el icono de imagen rota; precarga de las fotos para evitar parpadeos.
- iPhone/Safari: zonas seguras (muesca y barra inferior), prefijos `-webkit-` (máscara, clip-path), sin zoom por doble toque en botones, `hover` solo en dispositivos con ratón, texto sin inflarse en horizontal, ♥ siempre como símbolo (no emoji rojo).
- Accesibilidad: foco al nuevo título al cambiar de pantalla, `aria-expanded` en la carta, puntos y flechas de la galería con zona táctil mayor, `role="group"` en los puntos.
- Añadido favicon con corazón (evita el error 404 del icono).

## 2026-11-02 — Primera propuesta local
- Separación inicial de HTML, CSS y JavaScript.
- Rediseño romántico con cuatro pantallas: portada, carta, galería y cierre.
- Galería preparada para las cinco fotos existentes.
- Control de música opcional sin reproducción automática.
- Navegación para volver a empezar.
- Soporte inicial para movimiento reducido y foco de teclado.
- No se ha modificado el repositorio GitHub.
