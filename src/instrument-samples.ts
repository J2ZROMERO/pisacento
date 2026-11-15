// @ts-nocheck
// Browser controller migrated from the working salsa interface.
(function(root){
const files=['clave','cowbell','conga-open'];
function voice(pattern,sub){if(pattern==='strong')return 'cowbell';if(['open','open23'].includes(pattern))return 'conga-open';return 'clave'}
function create(context){const buffers=new Map();let pending;
async function load(){if(pending)return pending;pending=Promise.all(files.map(async name=>{const r=await fetch('samples/'+name+'.wav');if(!r.ok)throw Error('No se pudo cargar la muestra de '+name);const buffer=await context.decodeAudioData(await r.arrayBuffer());let peak=0;const d=buffer.getChannelData(0);for(let i=0;i<d.length;i++)peak=Math.max(peak,Math.abs(d[i]));let first=0;while(first<d.length&&Math.abs(d[first])<peak*.012)first++;buffers.set(name,{buffer,peak:Math.max(peak,.001),offset:Math.max(0,first/buffer.sampleRate-.001)})})).catch(e=>{pending=null;throw e});return pending}
function trigger(pattern,sub,when,destination,register){const name=voice(pattern,sub);const v=buffers.get(name);if(!v)throw Error('Muestras sin cargar');const notes=name==='piano'?[0,4,7]:name==='bass'?[sub<8?-1:6]:[0];for(const semitones of notes){const source=context.createBufferSource(),gain=context.createGain();source.buffer=v.buffer;source.playbackRate.value=2**(semitones/12);const duration=name==='piano'?.38:name==='bass'?.32:name.startsWith('voice-')?.6:Math.min(.8,v.buffer.duration-v.offset);gain.gain.setValueAtTime((name==='piano'?.17:.5)/v.peak,when);gain.gain.setValueAtTime((name==='piano'?.17:.5)/v.peak,when+Math.max(.005,duration-.025));gain.gain.linearRampToValueAtTime(0,when+duration);source.connect(gain).connect(destination);source.start(when,v.offset);source.stop(when+duration+.005);register(source)}}
return{load,trigger};}
const api={voice,create,files};if(typeof module!=='undefined')module.exports=api;else root.CompasSamples=api;
})(globalThis);
