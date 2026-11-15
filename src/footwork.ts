(function(root: Window | typeof globalThis){
const colors=['#9262b0','#c67638','#407aaf','#43927c','#799b36','#c75558'];
function frame(sub: number, style: string, type: string, centerBell=false): FeetFrame{
 const on2=style==='on2',beats=type==='sync'?(on2?[2,3,4,10,11,12]:[0,1,2,8,9,10]):[0,2,4,8,10,12];
 const index=beats.indexOf(sub),last=beats.reduce((a,v,i)=>v<=sub?i:a,-1),step=last<0?5:last;
 const basic: FootDirection[]=on2?['back','back','center','front','front','center']:['front','center','center','back','center','center'];
 const directions: FootDirection[]=type==='side'?['left','center','center','right','center','center']:type==='suzy'?['cross','right','cross','cross','left','cross']:type==='sync'?['front','center','center','back','center','center']:basic;
 const positions: Record<Foot,FootDirection>={left:'center',right:'center'};
 // Apply each landing once, including the center-line exercise.
 // Recomputing the previous foot from the unmodified path moved both feet on the next beat.
 for(let i=0;i<=step;i++){const foot=i%2?'right':'left',onBell=Math.floor(beats[i]/2)%2===0;positions[foot]=centerBell&&onBell?'center':directions[i]}
 const next=beats[step+1]??16,active=last>=0&&sub<Math.min(beats[step]+2,next);
 return{positions,foot:step%2?'right':'left',newStep:index>=0,active,stepSub:beats[step],direction:positions[step%2?'right':'left'],sync:active&&type==='sync'&&beats[step]%2===1};
}
const api: FeetAPI={frame,colors};if(typeof module!=='undefined')module.exports=api;else (root as Window).CompasFeet=api;
})(typeof window!=='undefined'?window:globalThis);
