# PROJECT_CONTEXT — amorcito

## Objetivo
Rediseñar la web de cumpleaños `amorcito` como una experiencia romántica, delicada y completa, priorizando iPhone y manteniendo el mensaje personal original.

## Decisiones confirmadas
- Estilo: romantic, elegante y cálido; rosa empolvado, crema, transparencias suaves y detalles de corazones.
- Alcance: completo.
- Música: opcional, nunca autoplay. El botón está preparado para `assets/musica/cancion.mp3`; no se incluye una canción.
- Contador: no incluir.
- Fotografías: incluir las cinco imágenes existentes.
- Mantener el texto original de la tarjeta de cumpleaños, salvo los cambios pedidos el 2026-11-03 (ver CHANGELOG).
- Los textos de la persona usuaria se respetan tal cual los escribió (sin corregir ortografía, abreviaciones ni expresiones: «q», «mas», «contigos», «ira», «tu»...).
- Galería sin pies de foto.
- No publicar ni modificar el repositorio original hasta aprobación expresa.

## Estructura prevista
- `index.html`: estructura y contenido.
- `css/style.css`: estilos y responsive.
- `js/main.js`: navegación, galería, animaciones y música.
- `assets/fotos/`: fotografías locales (copiar originales aquí al aprobar).
- `assets/musica/`: canción opcional, si se elige una.
- `PROJECT_CONTEXT.md`: contexto común para ChatGPT y Claude.
- `CHANGELOG.md`: registro de cambios.

## Flujo de trabajo
1. Trabajar en una copia local, nunca directamente sobre `main`.
2. ChatGPT coordina alcance y comprueba coherencia.
3. Claude revisa y propone correcciones técnicas sobre archivos concretos.
4. Revisar visualmente en móvil y escritorio.
5. Solo tras aprobación, integrar en GitHub Pages.

## Reglas
- No inventar una fecha de relación ni añadir contador.
- No iniciar audio automáticamente.
- No borrar ni sobrescribir originales.
- Mantener accesibilidad básica, foco visible y `prefers-reduced-motion`.
- No reemplazar el mensaje original sin autorización.
- No añadir dependencias/frameworks innecesarios.
- La versión de vista previa usa las URLs públicas actuales de las cinco fotos; antes de publicar, mover las imágenes a `assets/fotos/` y actualizar `PHOTOS` en `js/main.js` a rutas relativas.

## Estado
Versión final revisada (2026-11-03): textos actualizados, errores de HTML/CSS/JS corregidos y probada con emulación de iPhone (320–390 px, vertical y horizontal) y en escritorio. Pendiente de publicar. Falta añadir `assets/musica/cancion.mp3` si se quiere música.
