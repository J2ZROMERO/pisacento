(function(root: Window | typeof globalThis){
function beatAt(time: number, beats: readonly number[] | null | undefined, bpm: number, offset: number): number{
 if(!beats||beats.length<2)return(time-offset)*bpm/60;
 let lo=0,hi=beats.length-1;if(time<beats[0])return(time-beats[0])/(beats[1]-beats[0]);
 if(time>=beats[hi])return hi+(time-beats[hi])/(beats[hi]-beats[hi-1]);
 while(lo+1<hi){const mid=(lo+hi)>>1;if(beats[mid]<=time)lo=mid;else hi=mid}
 return lo+(time-beats[lo])/(beats[hi]-beats[lo]);
}
function timeAt(beat: number, beats: readonly number[] | null | undefined, bpm: number, offset: number): number{
 if(!beats||beats.length<2)return offset+beat*60/bpm;
 const n=beats.length-1;if(beat<0)return beats[0]+beat*(beats[1]-beats[0]);
 if(beat>=n)return beats[n]+(beat-n)*(beats[n]-beats[n-1]);
 const i=Math.floor(beat);return beats[i]+(beat-i)*(beats[i+1]-beats[i]);
}
const api: TimelineAPI={beatAt,timeAt};if(typeof module!=='undefined')module.exports=api;else (root as Window).CompasTimeline=api;
})(typeof window!=='undefined'?window:globalThis);
