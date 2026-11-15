// Experimental onset-guided beat positions with a tempo continuity penalty.
// This tracks pulse candidates, not meter/downbeats or instruments.
function trackBeats(onset,fps,period){
 const mean=onset.reduce((a,v)=>a+v,0)/Math.max(1,onset.length),scale=Math.max(mean,.000001),n=onset.length;
 const score=new Float64Array(n),previous=new Int32Array(n);previous.fill(-1);
 const min=Math.max(1,Math.floor(period*.65)),max=Math.ceil(period*1.45);
 for(let i=0;i<n;i++){let best=0,from=-1;for(let gap=min;gap<=max&&gap<=i;gap++){const candidate=score[i-gap]-7*Math.log(gap/period)**2;if(candidate>best){best=candidate;from=i-gap}}
 score[i]=Math.min(6,onset[i]/scale)+best;previous[i]=from;}
 let end=-1,best=-Infinity;for(let i=Math.max(0,n-Math.ceil(period*2));i<n;i++)if(score[i]>best){best=score[i];end=i}
 const frames=[];for(let at=end;at>=0;at=previous[at]){frames.push(at);if(previous[at]===at)break}frames.reverse();
 return frames.map(i=>i/fps);
}
function rhythmDiagnostics(beats,onset,en,fps,duration){
 const alerts=[];const add=(start,end,kind,label)=>{const prev=alerts.find(a=>a.kind===kind&&start<=a.end+.6&&end>=a.start);if(prev){prev.start=Math.min(prev.start,start);prev.end=Math.max(prev.end,end)}else alerts.push({start:Math.max(0,start),end:Math.min(duration,end),kind,label})};
 const gaps=beats.slice(1).map((t,i)=>t-beats[i]);
 const median=a=>{const b=[...a].sort((x,y)=>x-y);return b.length?b[Math.floor(b.length/2)]:0};
 // Compare local groups, not just the whole-song BPM. Do not renumber beats here.
 for(let i=4;i<gaps.length-3;i++){const before=median(gaps.slice(i-4,i)),after=median(gaps.slice(i,i+4));if(before&&Math.abs(after/before-1)>.1)add(beats[i],beats[Math.min(i+4,beats.length-1)],'tempo','Posible cambio de tempo · revisar')}
 let peak=0;for(const v of onset)peak=Math.max(peak,v);
 let weakStart=null;
 beats.forEach((t,i)=>{const k=Math.round(t*fps);let local=0;for(let j=Math.max(0,k-4);j<=Math.min(onset.length-1,k+4);j++)local=Math.max(local,onset[j]);
 if(local<peak*.1){weakStart??=t}else if(weakStart!==null){if(t-weakStart>1)add(weakStart,t,'weak','Pulso inferido · pocos ataques audibles');weakStart=null}});
 if(weakStart!==null&&duration-weakStart>1)add(weakStart,duration,'weak','Pulso inferido · pocos ataques audibles');
 let quietStart=null,maxEnergy=0;for(const v of en)maxEnergy=Math.max(maxEnergy,v);const threshold=Math.max(.00015,maxEnergy*.015);
 en.forEach((v,i)=>{const t=i/fps;if(v<threshold)quietStart??=t;else if(quietStart!==null){if(t-quietStart>=1.2)add(quietStart,t,'silence','Silencio o corte · conteo inferido');quietStart=null}});
 if(quietStart!==null&&duration-quietStart>=1.2)add(quietStart,duration,'silence','Silencio o corte · conteo inferido');
 return alerts.sort((a,b)=>a.start-b.start).slice(0,80);
}
/* Periodicity of positive energy changes. Does not classify musical sources. */
function estimate(samples,sampleRate,onProgress=()=>{}){
 onProgress('Midiendo ataques y energía del archivo completo…');
 const hop=Math.max(1,Math.round(sampleRate*.01)),en=[];
 for(let i=0;i<samples.length;i+=hop){let sum=0;for(let j=i;j<Math.min(i+hop,samples.length);j++)sum+=samples[j]*samples[j];en.push(Math.sqrt(sum/hop));}
 const attacks=en.map((v,i)=>Math.max(0,v-(en[i-1]||0))),onset=attacks.map((v,i)=>v+.5*(attacks[i-1]||0)+.5*(attacks[i+1]||0)),fps=sampleRate/hop;
 onProgress('Buscando periodicidad y tempo…');
 let best=-1,bpm=120,lagBest=50,scores=[];
 for(let lag=Math.round(fps*60/240);lag<=Math.round(fps*60/65);lag++){let s=0,a=0,b=0;for(let i=lag;i<onset.length;i++){s+=onset[i]*onset[i-lag];a+=onset[i]**2;b+=onset[i-lag]**2}const score=s/Math.sqrt(a*b||1);scores.push(score);if(score>best){best=score;lagBest=lag;bpm=60*fps/lag}}
 // Prefer a shorter, comparably strong periodic peak over a multiple of its period.
 // This avoids selecting 90 BPM for an evenly spaced 180 BPM pulse train.
 const minLag=Math.round(fps*60/240);
 const peaks=scores.map((score,i)=>({score,i})).filter(({score,i})=>score>=best*.75&&score>0&&score>=(scores[i-1]??-1)&&score>=(scores[i+1]??-1));
 if(peaks.length){const peak=peaks[0],i=peak.i,left=scores[i-1]??peak.score,right=scores[i+1]??peak.score,denom=left-2*peak.score+right;
 const adjustment=denom?Math.max(-.5,Math.min(.5,.5*(left-right)/denom)):0;lagBest=minLag+i+adjustment;best=peak.score;bpm=60*fps/lagBest}
 let phase=0,highest=-1;for(let p=0;p<lagBest;p++){let score=0;for(let i=p;i<onset.length;i+=lagBest)score+=onset[Math.round(i)]||0;if(score>highest){highest=score;phase=p/fps}}
 const duration=samples.length/sampleRate,wave=[];for(let i=0;i<200;i++){let start=Math.floor(i*en.length/200),end=Math.max(start+1,Math.floor((i+1)*en.length/200));wave.push(Math.max(...en.slice(start,end),0))}
 const energy=[];for(let s=0;s<duration;s+=2){const a=en.slice(Math.floor(s*fps),Math.floor((s+2)*fps));energy.push(a.reduce((x,y)=>x+y,0)/(a.length||1))}
 const changes=[];for(let i=2;i<energy.length-1;i++){const prev=(energy[i-1]+energy[i-2])/2,ratio=energy[i]/(prev||.00001);if((ratio>1.65||ratio<.5)&&energy[i]>.003&&(!changes.length||i*2-changes.at(-1)>8))changes.push(i*2)}
 const valid=duration>=8&&en.reduce((sum,v)=>sum+v,0)/Math.max(1,en.length)>.0001&&best>.08;
 onProgress('Localizando pulsos y construyendo el mapa temporal…');
 const beats=valid?trackBeats(onset,fps,lagBest):[];
 const diagnostics=valid?rhythmDiagnostics(beats,onset,en,fps,duration):[];
 return{diagnostics,beats,valid,bpm:Math.round(bpm*10)/10,offset:Math.round(phase*100)/100,periodicity:Math.max(0,best),duration,wave,changes:changes.slice(0,20)};
}
if(typeof self!=='undefined')self.onmessage=e=>{try{self.postMessage({ok:true,...estimate(e.data.samples,e.data.sampleRate,stage=>self.postMessage({type:'progress',stage}))})}catch(e){self.postMessage({ok:false,error:e.message})}};
if(typeof module!=='undefined')module.exports={estimate,trackBeats,rhythmDiagnostics};
