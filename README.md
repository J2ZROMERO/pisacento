# Pisacento · Conteo de salsa

La interfaz activa se centra exclusivamente en practicar el conteo de salsa: seguir el pulso, pisar el básico y mantener el conteo al cambiar de sonido. Entrada directa, sin selector de género, videoteca, explicación musical ampliada ni seguimiento de progreso.

## Ejecutar

Requiere Node.js 22 (fijado en `.node-version`).

```powershell
npm ci
$env:PORT=4320
npm start
```

Abre http://127.0.0.1:4320 . Validación: `npm run check` y `npm test`.

## Código

Edita los módulos migrados en `src/`; `npm run build` genera sus archivos JavaScript. `learning-path.js` define los tres ejercicios. `src/genre-home.ts` conserva su nombre por compatibilidad, pero ahora inicia únicamente salsa. Los controladores de salsa heredados siguen en JavaScript.

## Documentación histórica

La documentación en `docs/` conserva el razonamiento y desarrollo anterior. Sus descripciones de Bachata, videos y perspectiva musical ya no describen funciones visibles. Los módulos históricos se conservan como código, pero no se cargan en la página activa. Las licencias y los créditos de los archivos de audio permanecen en `samples/`.

## Publicación e identidad

Para desplegar desde GitHub, sube esta carpeta como raíz del repositorio y conecta el repositorio a **Cloudflare Pages**. Framework: **None**; comando: `npm run build:static`; salida: `dist`; rama: `main`. Cloudflare compila cada push. `dist` y `node_modules` no se suben a Git. No se necesita un comando de despliegue de Workers.

La variable opcional de compilación `GA4_MEASUREMENT_ID` activa las métricas de selecciones con tu identificador `G-…`. Sin ese valor, la configuración por defecto mantiene las métricas desactivadas. Consulta [ANALYTICS.md](docs/ANALYTICS.md).

`npm run build:static` prepara `dist/` para Cloudflare Pages. Consulta [CLOUDFLARE.md](docs/CLOUDFLARE.md) y [la revisión preliminar de identidad/licencias](docs/AUDITORIA_IDENTIDAD.md). Pisacento es un nombre propuesto, no una marca cuya disponibilidad registral esté confirmada.
