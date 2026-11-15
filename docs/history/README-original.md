## Modalidad y rol

Individual o en pareja, con rol propio Lead/Follower. Las huellas y la tabla siguen el pie inicial y la orientación del rol elegido. En pareja se muestra un segundo esquema del rol complementario desde su propia perspectiva; no es una pista compartida ni una simulación de conducción. Los ejercicios de clave/síncopa se presentan como práctica individual comparada. Preferencia de modo/rol guardada en localStorage.

## Instrumentos por capas

16 tarjetas con activación individual, solo, audición y coordinación de pies. Conjunto básico combina conga, clave, bajo y piano, con conga como referencia. Cada tarjeta documenta función/entradas habituales y advierte cuándo es un ejercicio. No hay un tiempo de entrada universal para metales o voz. Se mantienen clips/búsqueda de pasos abajo.

Sonidos: VCSL/VSCO2 CE CC0, bajo y guitarra tonejs-instruments CC BY3; maracas representadas por shaker, tres por guitarra, timbal modelado, voces sintéticas de sílabas generadas localmente. No se presentan como grabaciones auténticas de esos instrumentos exactos. Manifest y licencias en samples/.

## Modo principal: práctica rítmica escrita

La portada ahora muestra el laboratorio con pies independientes de canciones. Cinco conteos, doce referencias (congas, claves son/rumba, pulso, contratiempos, reducciones de bajo/piano), tempo regulable, rol, básico/lateral/cruces/síncopas y coordinación golpe a golpe. Audio y visuales usan reloj Web Audio común. El análisis anterior está plegado y se detuvo la carga automática de Yiyo.

Las sugerencias incluyen búsqueda y acceso al reproductor existente; Siguiente mantiene paso y estilo, incluyendo consultas específicas de Power2 y son. Las ejecuciones encontradas no están verificadas automáticamente. Fuentes y decisiones: FUENTES_PRACTICA.md. Validación: npm run check y npm test, más prueba UI de clave son 2–3 y enlace a lateral On2.

## Lista de figuras

13 botones por familia: siete figuras de salsa en línea con timing On1/On2 y seis de casino. Seleccionar una figura consulta internet y carga un video en el reproductor; siguientes búsquedas conservan figura y estilo. Niveles orientativos basados en temarios de Dance Dojo y Cambridge Salsa, no ranking de popularidad ni verificación automática de movimientos.

## Búsqueda integrada sin clave

El botón usa búsqueda pública de YouTube cuando no hay API key, carga un resultado aleatorio en el mismo reproductor y no abre pestañas. Se mantiene la consulta del paso y timing, excluyendo catálogo y vistos. Verificado con una consulta real de Básico On2. La búsqueda pública depende del formato de respuesta de YouTube y puede fallar; en ese caso muestra error, sin sustituirlo por catálogo. La API sigue como opción. Los movimientos y minutos exactos de los resultados nuevos no se verifican automáticamente.

## Búsqueda de videos en internet

El botón de otro video consulta YouTube Data API v3 con paso y timing fijos, excluye videos del catálogo y ya vistos, pagina resultados y elige un candidato aleatorio. Requiere YOUTUBE_API_KEY en el entorno o conectar una clave desde la videoteca (solo memoria del servidor). Sin clave abre una búsqueda en YouTube; no simula resultados del catálogo. Los resultados no están verificados por movimiento ni tienen recorte automático: se muestran completos y no entran en bucle de fragmento. No requiere ni descarga el audio/video. Pruebas del proveedor simuladas en test-video-search.cjs; falta validación real con clave.

## Videoteca de pasos

Sección independiente del análisis: 8 capítulos de 3 tutoriales públicos, filtros, bucle, velocidad y otro ejemplo aleatorio. Congas y síncopas están disponibles como categorías, pendientes de ejemplos verificados. El usuario puede añadir URL de YouTube, inicio/fin (máximo 10 minutos), estilo y categoría; se guarda en localStorage. No hace búsquedas automáticas ni reconoce movimientos. Fuentes: https://www.youtube.com/watch?v=t_clXFnHJEU , https://www.youtube.com/watch?v=z7YqGIuhWVg , https://www.youtube.com/watch?v=rDsmAHwKn6I . Los límites corresponden a capítulos publicados, no a cortes precisos revisados cuadro a cuadro.

> Motor actual para archivos completos: **librosa PLP + Beat This! final0**, ejecutado en el servicio Python local. Comparación reproducible en COMPARACION_MOTORES.md. Iniciar con iniciar.cmd o npm start; requiere conservar .venv y models/final0.ckpt. El análisis se aplica automáticamente antes de habilitar la práctica. Se guarda en caché el mapa por contenido del audio; el PCM temporal se elimina al terminar. Para cancelar, cambiar de fuente o cancelar el análisis aborta también el proceso local. YouTube sigue usando el flujo de fragmento de navegador, no el análisis completo especializado.

> Flujo vigente: al cargar un archivo se analiza completo en segundo plano y el mapa se aplica automáticamente. La práctica permanece oculta hasta terminar. Ya no hay paso manual de «Aplicar». El botón «Reproducir canción analizada» solo inicia la reproducción. El resumen es opcional y está plegado. Si falla o se cancela, la práctica del archivo sigue bloqueada. YouTube conserva un flujo separado de fragmento compartido; no se considera análisis completo.

# Compás · laboratorio de musicalidad

Aplicación local en español para explorar salsa y practicar conteos. No requiere instalación de paquetes ni claves de API. Node.js 18 o superior.

## Ejecutar

En esta carpeta: `npm start`. Abre http://127.0.0.1:4318. Detener: Ctrl+C en la terminal del servidor. Puerto alternativo en PowerShell: `$env:PORT=4318` antes de ejecutar.

## Uso

1. Prueba la demo instrumental sintetizada; sus entradas están programadas y no contiene voz.
2. Sube audio/video, pega una URL directa con CORS o un enlace de YouTube. El reproductor oficial de YouTube necesita conexión y autorización de inserción del propietario.
3. En archivos decodificables se estima BPM, fase de pulsos y cambios de energía. Comprueba el tempo con Tap tempo y alinea el primer 1 al escuchar. El algoritmo no identifica el primer tiempo del compás.
4. Elige On1 u On2 Eddie Torres. Practica básico, lateral, Suzy Q introductorio o un ejercicio sincopado. Escucha las imitaciones sintéticas de instrumentos mediante sus botones.
5. Marca entradas de instrumentos, voz, secciones o acentos con «Ahora». Guarda el mapa JSON y ábrelo sobre la misma grabación para continuar. Los ajustes también se guardan en localStorage; el archivo de audio no se almacena y debes volver a cargarlo. La apertura del mapa es explícita para no asociar marcas a otra canción por accidente.
6. Repite un fragmento o reduce la velocidad. Si cambias de pestaña, la reproducción se pausa para conservar la sincronía de la práctica.

## Qué analiza realmente

Web Audio decodifica el archivo; un Web Worker calcula envolvente de energía a intervalos de 10 ms, ataques positivos y autocorrelación normalizada para estimar periodicidad entre 65 y 240 BPM. Sugiere contrastes de energía cada 2 segundos. Límite de 150 MB y 30 minutos para archivos; compatible con formatos que el navegador pueda decodificar. Las duraciones largas pueden consumir memoria durante la decodificación.

No hay separación de fuentes ni clasificación de voz/instrumentos, frases o secciones. Estas marcas son manuales; un cambio de energía no equivale a montuno, mambo ni inicio de voz. La rejilla usa tempo constante: necesita corrección en grabaciones con fluctuaciones y puede elegir mitad/doble tempo. El porcentaje de periodicidad no es confianza estadística. No reconoce clave 2–3/3–2: la selección cambia únicamente el patrón pedagógico.

La demo usa síntesis simple y temporización de interfaz; es una herramienta educativa, no audio de estudio. El conteo hablado depende de las voces del sistema y puede retrasarse a tempo alto. La reproducción sintetizada se pausa al ocultar la pestaña. Para reconocimiento automático de voz/instrumentos en una futura versión se requeriría integrar un modelo de separación/clasificación y validar sus resultados con grabaciones etiquetadas.

## Fuentes consultadas

- https://salsabeatmachine.org/ — escucha de capas.
- https://salserosenclave.com/asieselmambo/como-bailar-salsa-en-clave/ — clave y conteo.
- https://udansa.com/es/guia-de-baile/aprender-a-bailar-salsa/aprender-ritmo-musical/estructura-cancion-salsa — secciones habituales, variables entre arreglos.
- https://howcast.com/videos/496836-how-to-do-the-suzy-q-dance-step-salsa-dancing/ — demostración pedagógica del paso.

Los patrones y consejos de la app son resúmenes didácticos; no transcripciones de canciones ni coreografías obligatorias. Se explica la diferencia entre ciclo de 8, compás 4/4 y frase musical.

## Verificación

`npm run check` valida sintaxis. `npm test` comprueba tempo y fase con un tren de pulsos sintético de 120 BPM y comportamiento con silencio. No constituye validación de exactitud sobre un corpus de música real. Sin dependencias externas de ejecución; fuentes web opcionales con tipografías de respaldo.

## Corrección de sincronía y campana

La campana de referencia acentúa 1, 3, 5 y 7, sin cambiar al seleccionar On1/On2. Los golpes cerrados y variantes reales dependen del arreglo. «Tap campana» considera dos tiempos entre pulsaciones; «Tap cada tiempo», uno. Al cargar una canción ya no se heredan los 160 BPM de la demo. Se bloquea la animación de conteo y la capa sintética hasta calibrar tempo y marcar el primer 1. Los golpes de práctica se programan con anticipación en Web Audio y la demo usa su reloj; la rejilla ilumina solo golpes presentes. No se han validado BPM ni entradas específicas de Corazón de Acero: el reproductor de YouTube no expone audio para el análisis.

Referencia: Kevin Moore, Finding the Clave (Timba.com), ejemplos de campana abierta/cerrada, conga y variaciones: https://www.timba.com/artist_pages/finding-the-clave?lang=en-US

## Canción inicial y BPM automático de video

La app inicia con el reproductor oficial de Corazón de Acero, de Yiyo Sarante (LyXIoVOGU3M), sin BPM fijo. «Detectar BPM del video» usa getDisplayMedia: el usuario debe escoger la pestaña de Compás y activar «Compartir audio». El permiso no puede concederse silenciosamente. Requiere navegador con captura de audio de pestaña (prueba Chrome o Edge si el navegador integrado no la ofrece).

Se captura únicamente la pista de audio con MediaRecorder durante 24 segundos, en memoria. No se envía audio al servidor ni se guarda la grabación; el stream solicitado por el navegador incluye video, pero el recorder utiliza solo sus pistas de audio. Todas las pistas se detienen al completar, cancelar o cambiar de fuente. Se rechazan capturas cortas, silenciosas y reproducciones que se pausaron o saltaron durante el muestreo. El usuario debe compartir la pestaña correcta y evitar anuncios/hablar sobre el audio. La pestaña compartida debe seguir reproduciendo la canción.

Los archivos continúan analizándose automáticamente al cargarlos. Tanto archivos como audio de pestaña activan una rejilla de fase estimada cuando se detecta periodicidad suficiente. Esa fase NO detecta el downbeat o primer 1; es provisional. Los taps y «Este es el 1» quedan como correcciones opcionales, no como cálculo inicial del BPM. El número puede estar a mitad/doble tempo. No se ha medido ni fijado un BPM específico para la canción inicial. Una captura a velocidad distinta de 1x se convierte a BPM y coordenadas de la grabación original.

Pruebas automáticas: señales sintéticas de 90, 120, 150 y 180 BPM; rechazo de silencio; programación de campana y cambio de velocidad. La captura real del navegador requiere autorización y elección de pestaña por el usuario; no queda verificada por las pruebas sintéticas.

## Pies y referencia única

La guía dibuja dos huellas SVG. El básico On1/On2 determina las posiciones y transferencias de peso; una única referencia instrumental determina el color de acento sobre el pie que sostiene o transfiere el peso. Un golpe instrumental no obliga a dar otro paso. El selector de referencia es independiente del check de todas las filas. Campana es la referencia inicial y la única fila visible para una primera visita; se conserva la preferencia visual guardada. «Solo este» selecciona también esa referencia para los pies. Las síncopas son ejercicios de práctica, no transcripciones de la grabación. La animación necesita la rejilla calibrada o estimada, o la demo. Los patrones instrumentales continúan siendo didácticos.

## Revisión de viabilidad y sincronía

Consulta ANALISIS_SINCRONIA.md. El seguimiento ahora conserva candidatos de posiciones de pulso del audio y los usa para sincronizar indicadores y sonidos de referencia. La tabla permite intervalos variables; no identifica el primer 1 ni instrumentos. Fuera del fragmento de captura se muestra EXTRAPOLADO; no se garantiza alineación con la canción completa. Los indicadores mantienen presencia visual, luces de pulso entero y números estables. El estado SIN SINCRONIZAR explica por qué no hay animación antes de analizar el audio.

## Cargar → analizar → aplicar

«Cargar y analizar canción completa» acepta un archivo compatible (hasta 150 MB y 30 minutos). Se lee y decodifica todo el audio, se estima su tempo y se construye una tabla de candidatos de pulso. El proceso muestra etapas, permite cancelar y presenta duración, BPM, cantidad de pulsos, primer candidato, cambios de energía y periodicidad. Los resultados no se activan hasta pulsar «Aplicar análisis y practicar». Ese botón aplica el mapa al MISMO archivo, vuelve al inicio y comienza la reproducción. Cambiar de fuente o cancelar descarta el resultado pendiente. La captura de YouTube conserva su flujo de fragmento, sin convertirlo en un análisis completo.

Prueba de navegador: carga de prueba-pulso-120.wav (20 s), resultado 120.1 BPM y 40 pulsos; se verificó la transición de pendiente a aplicado y reproducción. Es una señal sintética, no una validación sobre la canción de Yiyo.

## Cambios e irregularidades

El análisis añade candidatos de cambio de tempo (medianas locales de intervalos), tramos con poca evidencia de ataques y silencios/cortes prolongados. El resumen cuenta avisos y la sección «Cambios e irregularidades» permite saltar a cada tramo; durante la reproducción aparece el aviso correspondiente. Los avisos no modifican ni reinician la secuencia de pulsos. Durante un corte, el seguimiento puede mantener pulsos inferidos: no son ataques detectados. No se garantiza detectar todos los cambios, ni cambios de compás, duración de una fermata o primer 1. Los mapas guardados conservan estos avisos. Pruebas: corte sintético entre 5 y 8 s, secuencia con cambio de intervalo y secuencia regular sin avisos falsos de cambio de tempo en esa prueba.

## Motores comparados e integración

Se ejecutaron 30 pruebas: cinco variantes sobre cinco señales sintéticas etiquetadas y un fragmento real sin anotaciones. Se compararon además dos combinaciones a partir de esas salidas. Ver COMPARACION_MOTORES.md y benchmark/results-with-hybrid.json. No se evaluó exactitud sobre la grabación de Yiyo Sarante.

El servicio POST /api/analyze recibe PCM float32 mono a 11025 Hz, ejecuta local_analyzer.py con .venv/Scripts/python.exe y selecciona el modelo desde analyzer-config.json. Solo escucha en 127.0.0.1; valida host/origen, formato y tamaño; no acepta URLs ni rutas de archivos del cliente. No hay descarga de audio remoto en el backend. El tiempo máximo es cinco minutos; las pistas largas pueden excederlo según el equipo. La primera carga necesita importar modelos y librerías y puede tardar. Repetir el mismo archivo usa el mapa guardado en analysis-cache/.

«Este es el 1» conserva ahora la tabla de pulsos especializada; solo reagrupa el ciclo. «Intercambiar 1/5» cambia esa agrupación sin mover los golpes en el audio. Estos ajustes no garantizan que el primer tiempo de compás estimado por el modelo sea correcto. La combinación no reconoce golpes individuales de campana ni otros instrumentos.

Verificación adicional: npm run test:backend (requiere servidor iniciado y caché de la prueba oficial); comprobación de formato, origen externo rechazado y mapa cacheado. Los pesos se descargaron de la ubicación oficial del proyecto CPJKU/beat_this. Paquetes fijados en requirements-local-lock.txt.


## Diseño mobile first
`responsive.css` define la base de móvil; los puntos de expansión son 600 px (tablet) y 960 px (escritorio). Mantener las nuevas reglas responsive en este archivo y conservar los controles principales con altura mínima de 44 px y campos a 16 px. El tema histórico permanece en `style.css`; no añadir nuevos parches de escritorio con excepciones móviles allí.
`responsive-layout.js` agrupa conteo, instrumentos y pisadas en una sola superficie horizontal desplazable: no separar sus desplazamientos ni reducir las casillas para hacerlas caber en un teléfono. Las tablas de consulta también tienen su propio contenedor de desplazamiento.
Validación en navegador: 320, 390, 768 y 1440 px, sin desbordamiento horizontal de página. Recursos e instrumentos/videoteca abiertos también comprobados a 320 px. Conteo en tiempo 8 tras desplazar la matriz: las tres columnas permanecen alineadas. Son tamaños emulados; no sustituyen pruebas en dispositivos físicos.
