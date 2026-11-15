# Comparación de detectores y decisión de integración

## Qué se ejecutó

Se ejecutaron cinco variantes: detector JS existente, librosa beat_track (DP), librosa PLP, Beat This small0 y Beat This final0. Se hicieron 30 ejecuciones sobre cinco señales sintéticas etiquetadas de 36 segundos y un fragmento real de swing de 45 segundos. Las dos combinaciones PLP + Beat This se evaluaron recombinando las salidas ya obtenidas: no son dos ejecuciones independientes adicionales.

Las señales sintéticas contienen un pulso simple, dos mezclas rítmicas tipo salsa a 160/180 BPM, una aceleración y un corte. Sus tiempos son conocidos por construcción. No son grabaciones reales de salsa. La grabación real proviene del archivo de prueba oficial de CPJKU/beat_this y carece aquí de anotaciones: no se calcula exactitud en ella. No se ha analizado ni validado la grabación de Yiyo Sarante.

## Resultados sintéticos

F1 con tolerancia de 70 ms, promedio de los cinco casos. No es confianza del modelo ni probabilidad de acierto en cualquier canción. El tiempo es la mediana de las seis ejecuciones por variante en este equipo, CPU y dos hilos para PyTorch. Las primeras llamadas a librosa tuvieron calentamiento/JIT adicional; la primera DP tardó 32.098 s frente a su mediana de 0.385 s.

| Motor | F1 pulsos | F1 primeros tiempos | Mediana segundos |
|---|---:|---:|---:|
| baseline_js | 0.999 | — | 0.21 |
| librosa_dp | 0.921 | — | 0.39 |
| librosa_plp | 0.982 | — | 0.31 |
| beat_this_small0 | 0.949 | 0.076 | 10.34 |
| beat_this_final0 | 0.831 | 0.830 | 17.82 |
| hybrid_plp_small0 | 0.982 | 0.077 | 10.65 |
| hybrid_plp_final0 | 0.982 | 0.830 | 18.14 |

Los tiempos de los híbridos son la suma de sus componentes, no una medición directa del servicio. El ensayo HTTP posterior comprueba por separado el funcionamiento de la combinación integrada.

## Interpretación

El detector JS obtuvo el mejor F1 de pulsos en estas señales construidas, pero no propone primeros tiempos de compás y esto no demuestra que sea superior en música real. PLP fue el mejor de los detectores especializados probados para pulsos en esta muestra. Beat This final0 tuvo errores de mitad de tempo en dos mezclas sintéticas cuando se usó solo, pero estimó mucho mejor los compases que small0. La combinación conserva los pulsos PLP y proyecta los compases final0 únicamente cuando caen suficientemente cerca de esos pulsos.

En el swing real aparecieron lecturas alrededor de 112 y 231 BPM según el detector. Sin anotación de referencia no se decide cuál es la lectura métrica correcta ni se convierte ese acuerdo en exactitud. Los desacuerdos de tempo o de compases se muestran como avisos.

## Decisión

Se integra por defecto librosa PLP + Beat This final0 en un servicio Python local para archivos completos. Es la elección de mayor utilidad conjunta para pulso+compás en este piloto, no un ganador de exactitud general demostrado. La interfaz sigue permitiendo corregir el primer 1; distinguir 1/5 del ciclo de baile no queda garantizado por detectar compases. No se reconocen campana, clave ni otros instrumentos por separado. La captura YouTube de 24 s sigue siendo experimental y usa el detector de navegador: no se presenta como análisis completo con este motor.

El servicio aplica el análisis antes de habilitar la práctica, guarda resultados por hash de audio+versión del motor para no recalcular, permite cancelar y procesa el audio solo en localhost. No descarga audio de YouTube ni manda audio a terceros.

## Reproducir el ensayo

Entorno .venv, paquetes fijados en requirements-local-lock.txt; pesos oficiales final0/small0 en models/. Ejecutar benchmark/generate_cases.py, benchmark/compare.py y benchmark/summarize.py con .venv/Scripts/python.exe. La carga de modelos y la inferencia real se hicieron sin el posprocesador opcional DBN.

Resultados completos: benchmark/results.json, benchmark/results-with-hybrid.json y benchmark/summary.json.

Fuentes: https://github.com/CPJKU/beat_this ; https://librosa.org/doc/main/_modules/librosa/beat.html ; https://github.com/librosa/librosa/blob/main/librosa/beat.py ; https://github.com/CPJKU/beat_this/tree/main/tests .

## Prueba HTTP de extremo a extremo

Se envió al servidor local el mismo fragmento real de swing (45 s) en PCM, y se recibió el mapa con el motor híbrido final0. Primera solicitud sin caché: 50.39 segundos de extremo a extremo; es una medición del servicio, no comparable directamente con las medianas de las funciones del benchmark. La segunda solicitud devolvió el mismo mapa desde caché. El resultado no constituye verdad musical de referencia: no hay anotación manual del swing.

Salida observada: 234.9 BPM, 172 pulsos desde el primer compás propuesto y 46 primeros tiempos estimados. El primer 1/5 del ciclo de baile permanece sin verificación.
