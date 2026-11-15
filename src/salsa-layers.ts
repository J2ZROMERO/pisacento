// @ts-nocheck
// Browser controller migrated from the working salsa interface.
(function(root){
const layers=[
{id:'strong',name:'Campana / cencerro',sound:'Grabación de campana',when:'Puede reforzar montuno o secciones de mayor energía; su entrada depende del arreglo.',note:'Aquí solo acentos 1·3·5·7. Mantén el básico o marca esos golpes como ejercicio.'},
{id:'son23',name:'Claves',sound:'Grabación de claves',when:'Puede sonar explícita o quedar implícita en las otras partes.',note:'Referencia inicial son 2–3: 2,3,5,6&,8. En el selector puedes cambiar a son/rumba 2–3 o 3–2.'},
{id:'conga',name:'Congas / tumbadoras',sound:'Grabaciones abiertas y apagadas',when:'Acompañan el groove; cambian marcha, acentos y rellenos según la sección.',note:'Reducción: acentos 2/6 y abiertos 4,4&,8,8&. El sample apagado no certifica un slap técnico.'},
{id:'bass',name:'Bajo eléctrico / contrabajo',sound:'Grabación de bajo eléctrico',when:'Sostiene armonía y pulso; puede anticipar cambios y dejar silencios.',note:'Ejercicio 2&,4,6&,8. No todos los bajos hacen este tumbao ni entran en el mismo tiempo.'},
{id:'piano',name:'Piano',sound:'Grabación de piano con acorde',when:'Puede acompañar la melodía y repetir guajeos en montuno, además de hacer solos.',note:'Guajeo inventado para distinguir ataques y contratiempos. No es un montuno universal.'},
{id:'bongo',name:'Bongó',sound:'Grabación de bongó',hits:[0,2,3,4,6,8,10,11,12,14],when:'Puede acompañar con martillo y variaciones; el bongosero puede pasar a campana en otra sección.',note:'Ataques de práctica, no transcripción completa de martillo ni regla de cuándo cambiar a campana.'},
{id:'timbales',name:'Timbales / cáscara',sound:'Sonido modelado · no grabación de timbal',hits:[0,3,4,6,8,10,11,14],when:'Cáscara, campanas y golpes de parche pueden acompañar y anunciar transiciones con rellenos.',note:'Patrón y timbre didácticos; no existe un relleno ni una entrada obligatoria en cada canción.'},
{id:'guiro',name:'Güiro',sound:'Grabación de güiro',hits:[0,3,4,7,8,11,12,15],when:'Raspados largos y cortos sostienen subdivisión; frecuente en formatos de charanga.',note:'Ejemplo de ataques largos/cortos simplificados; no una transcripción del patrón completo.'},
{id:'maracas',name:'Maracas / sonajas',sound:'Grabación de shaker · sustituto de maracas',hits:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],when:'Pueden mantener subdivisiones y acentos bajo la voz y el conjunto.',note:'Corcheas iguales como ejercicio; la técnica y el fraseo real de maracas no son uniformes.'},
{id:'trumpet',name:'Trompeta',sound:'Grabación de trompeta',hits:[0,3,6,12],when:'Melodías, respuestas, frases de mambo, acentos o solos, según el arreglo.',note:'Frase rítmica inventada; los metales pueden anticipar el pulso y no anuncian siempre el 1.'},
{id:'trombone',name:'Trombón',sound:'Grabación de trombón',hits:[2,6,10,14],when:'Puede integrar riffs, armonías, respuestas y solos.',note:'Cuatro ataques de práctica; no se debe pisar cada nota de una sección de metales.'},
{id:'flute',name:'Flauta',sound:'Grabación de flauta',hits:[0,3,5,8,11,13],when:'Característica de charanga; puede llevar melodías, adornos y solos.',note:'Frase inventada para practicar escucha, no una melodía tradicional ni entrada fija.'},
{id:'violin',name:'Violín',sound:'Grabación de violín',hits:[0,4,8,12],when:'En charanga puede hacer melodía, respuestas y acompañamientos repetidos.',note:'Ataques regulares de ejemplo. Este conjunto no representa toda la instrumentación de charanga.'},
{id:'guitar',name:'Tres cubano / guitarra',sound:'Grabación de guitarra · sustituto de tres',hits:[0,3,6,8,11,14],when:'El tres es central en formatos de son; puede tocar guajeos y dialogar con la voz.',note:'Se usa guitarra acústica como sustituto audible. No es una grabación de tres cubano.'},
{id:'voicelead',name:'Voz solista / pregón',sound:'Voz sintética «eh» · no cantante real',hits:[1,4,7],when:'Puede presentar versos, anticipar o retrasar ataques y dialogar con el coro en montuno.',note:'Entrada de ejemplo en 1&,3,4&. No se puede deducir el 1 musical por la primera sílaba.'},
{id:'voicecoro',name:'Coro / respuesta',sound:'Voz sintética «la» · no coro real',hits:[8,10,12],when:'Puede responder con frases repetidas al solista; la duración y colocación dependen de la composición.',note:'Respuesta inventada en 5,6,7, después del ejemplo solista. No hay un conteo único para la voz.'}
];
function install(patterns){for(const l of layers)if(l.hits)patterns[l.id]={name:l.name+' · ejemplo',hits:l.hits,help:l.note}}
const api={layers,install};if(typeof module!=='undefined')module.exports=api;else root.CompasLayers=api;
})(globalThis);
