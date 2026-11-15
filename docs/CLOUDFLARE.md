# Publicar Pisacento en Cloudflare

La interfaz activa (conteo, pies y muestras de salsa) funciona en el navegador y puede publicarse como sitio estático. No hace falta trasladar el servidor Node local para esa práctica.

## Compilar

```sh
npm ci
npm run build:static
```

La carpeta `dist` contiene la página, sus scripts/estilos, el símbolo SVG y solo las tres muestras de audio activas verificadas por SHA-256 y CC0. No publiques la carpeta del proyecto completa: contiene históricos, documentación y módulos no utilizados.

## Cloudflare Pages

### Conectar GitHub (recomendado)

1. Crea un repositorio y sube el contenido de `compas-starter` como raíz: `package.json` debe estar en la raíz del repositorio. Incluye `package-lock.json`, `.node-version`, `src`, `tools`, scripts, estilos y `samples`. El `.gitignore` excluye dependencias, salida de compilación y archivos de entorno.
2. En Cloudflare selecciona Workers & Pages → Create application → Pages → Connect to Git; elige GitHub y el repositorio.
3. Rama de producción: `main`. Framework preset: `None`. Build command: `npm run build:static`. Build output directory: `dist`. Root directory: déjalo vacío si subiste el contenido como raíz.
4. Node 22 queda indicado en `.node-version`; no se requieren Python ni un servidor persistente. Cloudflare instala las dependencias npm antes de compilar. No excluyas las devDependencies: TypeScript se necesita durante la compilación.
5. Opcional: agrega `GA4_MEASUREMENT_ID=G-…` en las variables de compilación de producción. No lo agregues a previews si quieres excluirlas de tus métricas. El build genera la configuración pública de analytics. Consulta `ANALYTICS.md` para crear los informes. No necesita una clave secreta de GA4.
6. Guarda y despliega. Los próximos pushes a `main` actualizan el sitio automáticamente.

Si ya creaste un proyecto de Direct Upload, crea un nuevo proyecto Pages conectado a Git: ese tipo de proyecto no se puede convertir a Git integration. Este flujo no utiliza Workers Builds ni requiere `wrangler deploy`.

En un proyecto conectado a Git, configura el directorio raíz como `compas-starter` si esa es la subcarpeta del repositorio, comando de compilación `npm run build:static` y directorio de salida `dist`. Alternativamente usa Direct Upload con el contenido de `dist` o el ZIP estático entregado. Cloudflare asigna una URL HTTPS; también permite un dominio personalizado.

Referencia oficial: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Lo que no incluye este despliegue

El antiguo servidor `server.cjs` escucha en localhost y utiliza filesystem/procesos Python. No se ejecuta sin cambios como un sitio Pages. Las rutas históricas `/api/analyze` y `/api/video-search` no están incluidas. Esas funciones ya no son accesibles en la interfaz de práctica. Restaurarlas requeriría un backend separado o adaptar APIs al entorno elegido, no simplemente subir el servidor local.

La página conserva algunos nodos ocultos de compatibilidad que los controladores heredados necesitan. El paquete no ofrece análisis automático de canciones. Los sonidos locales no son grabaciones de canciones comerciales.

La preparación no publica nada ni configura una cuenta o dominio. Valida el nombre en registros de marcas antes de lanzar comercialmente. El dominio Pisacento no ha sido consultado ni reservado.
