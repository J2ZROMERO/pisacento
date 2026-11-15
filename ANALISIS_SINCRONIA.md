# Viabilidad y revisión de sincronía

El conteo audiovisual es viable. Una rejilla rígida de BPM+fase no garantiza seguir música real durante toda la canción. Un error de 1 BPM acumula tres pulsos en tres minutos. La medición de un fragmento tampoco identifica el primer tiempo de compás ni demuestra cuándo golpea cada instrumento.

## Hallazgos en esta implementación

- El detector calculaba un BPM global y una fase, extrapolados sin corrección.
- La captura de YouTube solo abarca 24 segundos; fuera de ese segmento no hay audio observado.
- La rejilla de instrumento resaltaba golpes enteros solo medio pulso, mientras los pies ya usaban una duración diferente.
- Los números cambiaban al & aunque la vista elegida fuese de pulsos completos, dificultando seguir el 1–8.
- El dibujo de onda se recalculaba 40 veces por segundo en la misma función que actualiza el conteo.
- Los patrones de instrumento son didácticos; no son reconocimiento de la grabación.

## Cambios

La visualización se actualiza con requestAnimationFrame, siempre calculada desde el tiempo de reproducción, sin contar ticks como pulsos. La onda se limita a 10 actualizaciones por segundo. Las huellas permanecen visibles; el acento cambia de color sin hacer desaparecer la posición. Las luces de pulsos enteros se mantienen durante el &, y la vista básica conserva el número entero.

El análisis ahora devuelve candidatos de posiciones de pulso mediante programación dinámica sobre ataques y una penalización de discontinuidad de tempo. Los indicadores, los pies y los sonidos de práctica consultan la misma tabla de tiempos. Entre pulsos se interpola; fuera de ella se extrapola el intervalo vecino. El inicio de esa tabla NO identifica el primer 1 del compás.

Un aviso diferencia demo, pulsos estimados, rejilla manual y extrapolación fuera del fragmento capturado. Los mapas guardados incluyen la tabla de pulsos. Cambiar BPM manualmente vuelve a una rejilla fija. Los patrones de campana y demás instrumentos continúan siendo referencias educativas.

## Evidencia y límites

Las pruebas comprueban señales sintéticas constantes, una señal con intervalos variables (más del 90% de sus pulsos quedan a menos de 50 ms), interpolación reversible y programación sin duplicados. Eso no es validación sobre salsa real ni mide el retraso audiovisual de YouTube, de Bluetooth o de la pantalla. No se ha demostrado sincronía con Corazón de Acero. Una precisión confiable requiere validar posiciones y downbeats sobre grabaciones reales anotadas; una referencia de audio completa permite evaluar toda la pista, mientras un fragmento compartido deja el resto sin observar.

Referencias: https://www.labrosa.org/~dpwe/pubs/Ellis06-beattrack.pdf (beat tracking por programación dinámica); https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/getOutputTimestamp (reloj de salida de audio y visualización); https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime (precisión y frecuencia de actualización no garantizadas por sus decimales).
